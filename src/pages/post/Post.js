import styles from "./Post.module.css";
import { useParams } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
function Post() {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocuments("posts", id);
  return (
    <div className={styles.post_container}>
      {loading && <p>carregando...</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} className={styles.imgPost} />
          <p>{post.body}</p>
          <h3>Esse post e sobre:</h3>
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Post;
