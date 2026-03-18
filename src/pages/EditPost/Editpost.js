import style from "./Editpost.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { serverTimestamp } from "firebase/firestore";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
function Editpost() {
  const { id } = useParams();
  const { document: post } = useFetchDocuments("posts", id);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);
      const textTags = post.tags.join(", ");
      setTags(textTags);
    }
  }, [post]);

  const { user } = useAuthContext();
  const { response, updateDocument } = useUpdateDocument("posts");
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
          .filter((tag) => tag !== ""),
      ),
    ];

    if (!title || !image || !body || TagsArray.length === 0) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    const data = {
      title,
      image,
      body,
      tags: TagsArray,
      uId: user.uid,
      createdby: user.displayName || user.email,
      createdAt: serverTimestamp(),
    }

    await updateDocument(id, data);

    navigate("/Dashboard");
  };

  return (
    <div className={style.edit_post}>
      {post && (
        <>
        <h2>Edite Seu Post: {post.title}</h2>
        <p>Altere como desejar!</p>

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
            <p className={style.preview_title}>Preview da imagem:</p>
            <img className={style.image_preview} src={post.image} alt={post.title} />
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
          <input type="submit" value="Publicar novamente" className="btn" />
        )}

        {response.loading && (
          <input type="submit" value="Aguarde..." disabled className="btn" />
        )}

        {response.error && <p className="error">{response.error}</p>}
        {error && <p className="error">{error}</p>}
      </form>
        </>
      )}
    </div>
  );
}

export default Editpost;
