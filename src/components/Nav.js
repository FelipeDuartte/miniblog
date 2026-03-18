import styles from './Nav.module.css';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useAuthentication } from '../hooks/useAuthentication';
function Nav() {

    const { user } = useAuthContext();
    const { logout } = useAuthentication();
  return (
        <nav className={styles.navbar}>
     <NavLink to={"/"} className={styles.brand} > Mini <span>Blog</span> </NavLink>
     <ul className={styles.links_list}>
       
        {!user && (
            <>
             <li>
            <NavLink to={"/Login"} className={({isActive}) => (isActive ? styles.active : '')}> Login </NavLink>
        </li>
         <li>
            <NavLink to={"/Register"} className={({isActive}) => (isActive ? styles.active : '')}> Register </NavLink>
        </li>
        </>
        )}
        {user && (
            <>
             <li>
            <NavLink to={"/about"} className={({isActive}) => (isActive ? styles.active : '')}> About </NavLink>
            </li>
            <li>
                <NavLink to={"/"} className={({isActive}) => (isActive ? styles.active : '')}> Home </NavLink>
            </li>
            <li>
            <NavLink to={"/Post/CreatePost"} className={({isActive}) => (isActive ? styles.active : '')}> Create Post </NavLink>
            </li>
             <li>
            <NavLink to={"/Dashboard"} className={({isActive}) => (isActive ? styles.active : '')}> Dashboard </NavLink>
            </li>
            </>
        )}
        {user && (
            <li>
                <button onClick={logout} className={styles.logout_btn}>Logout</button>
            </li>
        )}
     </ul>
     </nav>
  );
}

export default Nav;