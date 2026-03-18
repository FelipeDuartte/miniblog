import styles from './PostDetails.module.css'
import {Link} from 'react-router-dom'
export const PostDetails = ({post}) => {
    return(
        <div className={styles.post_detail}>
            <img src={post.image} alt={post.title} />
            <h2>{post.title}</h2>
            <p className={styles.post_createdBy}>{post.createdBy}</p>
            <div>
            {post.tags.map((tag) => (
                <p key={tag}>
                    <span>#</span>
                    {tag}
                </p>
            ))}
            </div>
        <Link to={`/posts/${post.id}`} className="btn btn-outline"> Ler </Link>
        </div>
    )
}