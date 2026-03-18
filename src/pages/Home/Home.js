import style from "./Home.module.css";
import { useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { PostDetails } from "../../components/PostDetails";
function Home() {
  const navigate = useNavigate();
  const [query, setquery] = useState("");
  const { document: posts, loading } = useFetchDocument("posts");
  const handleSubmit = (e) => {
    e.preventDefault();

    if(query){
      return navigate(`/search?q=${query}`)
    }
  };

  return (
    <div className={style.home}>
      <h1>Pesquise os posts!</h1>
      <form className={style.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ou busque por tags..."
          onChange={(e) => setquery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        <h1>Posts</h1>
        {loading && <p>caarregando...</p>}
        {posts &&
          posts.map((post) => <PostDetails key={post.id} post={post} />)}
        
        {posts && posts.length === 0 && (
          <div className={style.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/Post/CreatePost" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
