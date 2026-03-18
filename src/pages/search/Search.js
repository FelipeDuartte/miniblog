import styles from "./Search.module.css";
//Query
import { useQuery } from "../../hooks/useQuery";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { PostDetails } from "../../components/PostDetails";
import {Link} from "react-router-dom"
function Search() {
    const query = useQuery();
    const search = query.get("q")?.toLowerCase()
    const {document: posts} = useFetchDocument('posts', search)
    return(
        <div className={styles.search_container} >
            <h2>Search</h2>
            <div>
                {posts && posts.length === 0 && (
                    <div className="styles.noposts" >
                    <p>Não encontramos posts com essas informaçoes</p>
                    <Link className={'btn btn-dark'} to={"/"}>
                    Voltar
                    </Link>
                    </div>
                )}
                {posts && posts.map((post) => (
                    <PostDetails key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}
export default Search;
