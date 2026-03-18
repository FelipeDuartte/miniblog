import style from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useFetchDocument } from "../hooks/useFetchDocument";
import { useDeleteDocument } from "../hooks/useDeleteDocument";
function Dashboard() {
  const { user } = useAuthContext();
  const uid = user.uId;

  const { document: posts, loading } = useFetchDocument("posts", null, uid);
  const { deleteDocument } = useDeleteDocument("posts");

  if (loading) {
    return <p>carregando...</p>;
  }

  return (
    <div className={style.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={style.noposts}>
          <p>não foram encontrados posts!</p>
          <Link to={"/Post/CreatePost"} className="btn">
            criar posts
          </Link>
        </div>
      ) : (
          <div className={style.post_header}>
            <span>Titulo</span>
            <span>Ações</span>
            </div>
      )};
            {posts &&
              posts.map((post) => (
                <div key={post.id} className={style.post_row}>
                  <p>{post.title}</p>
                  <div>
                    <Link to={`/posts/${post.id}`} className="btn btn-outline">
                      Ver
                    </Link>
                    <Link
                      to={`/posts/edit/${post.id}`}
                      className="btn btn-outline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteDocument(post.id)}
                      className="btn"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
          </div>
  );
}

export default Dashboard;
