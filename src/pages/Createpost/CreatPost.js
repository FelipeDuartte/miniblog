import style from "./CreatePost.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { serverTimestamp } from "firebase/firestore";

function CreatPost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  const { user } = useAuthContext();
  const { response, insertDocument } = useInsertDocument("posts");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // validar URL da imagem
    try {
      new URL(image);
    } catch {
      setError("A imagem precisa ser uma URL válida.");
      return;
    }

    // transformar tags em array seguro
    const TagsArray = [
      ...new Set(
        tags
          .split(",")
          .map((tag) => tag.trim().toLowerCase())
          .filter((tag) => tag !== "")
      ),
    ];

    if (!title || !image || !body || TagsArray.length === 0) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    await insertDocument({
      title,
      image,
      body,
      tags: TagsArray,
      uId: user.uid,
      createdby: user.displayName || user.email,
      createdAt: serverTimestamp(),
    });

    navigate("/");
  };

  return (
    <div className={style.create_post}>
      <h2>Escreva e compartilhe suas ideias!</h2>
      <p>Compartilhe suas ideias com a comunidade!</p>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Pense em um bom título"
            required
          />
        </label>

        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Insira uma imagem que representa o seu post"
          />
        </label>

        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Insira o conteúdo do post"
          />
        </label>

        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Insira as tags separadas por vírgula"
          />
        </label>

        {!response.loading && (
          <input type="submit" value="Publicar" className="btn" />
        )}

        {response.loading && (
          <input type="submit" value="Aguarde..." disabled className="btn" />
        )}

        {response.error && <p className="error">{response.error}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default CreatPost;