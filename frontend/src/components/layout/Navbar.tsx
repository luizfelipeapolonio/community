import styles from "./Navbar.module.css";

// Icons
import { FaUsers, FaSearch } from "react-icons/fa";

import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={styles.nav_container}>
            <div className={styles.logo}>
                <Link to="/">
                    <FaUsers />
                    <h1>Community</h1>
                </Link>
            </div>
            <form className={styles.search}>
                <input type="text" placeholder="Busque pelo título ou tag" />
                <button><FaSearch /></button>
            </form>
            <div className={styles.options}>
                <NavLink 
                    to="/login" 
                    className={({ isActive }) => isActive ? styles.active : ""}
                >
                    Entrar
                </NavLink>
                <NavLink 
                    to="/register"
                    className={({ isActive }) => isActive ? styles.active : ""}
                >
                    Cadastrar
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;