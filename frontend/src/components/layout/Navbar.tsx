import styles from "./Navbar.module.css";

// Icons
import { FaUsers, FaUser, FaUserCog, FaSignOutAlt, FaSearch, FaBookmark } from "react-icons/fa";
import { BsFillFilePostFill } from "react-icons/bs";

import { Link, NavLink } from "react-router-dom";

// Hooks
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks/useAuth";

// Reducer types
import { AppDispatch } from "../../config/store";

import { reset, logout } from "../../slices/authSlice";

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState<string>("");

    const { auth } = useAuth();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = async () => {
        await dispatch(logout());
        dispatch(reset());
        setToggleMenu("");
    }

    const toggleDropdownMenu = () => {
        setToggleMenu((isOpen) => isOpen ? "" : "open");
    }

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
            {auth ? (
                <>
                    <div className={styles.auth_container}>
                        <NavLink 
                            to="/"
                            className={({ isActive }) => isActive ? styles.active : ""}
                        >
                            Home
                        </NavLink>
                        <NavLink to="#">
                            Criar Post
                        </NavLink>
                        <div className={styles.auth_user} onClick={toggleDropdownMenu}>
                            <div className={toggleMenu ? styles.is_open : "" }>
                                <FaUser />
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.drop_menu} ${styles[toggleMenu]}`}>
                        <div className={styles.user}>
                            <img src="/profileImage.jpg" alt="Image de perfil" />
                            <span>Felipe</span>
                        </div>
                        <Link to="#" className={styles.edit_profile}>
                            <div><FaUserCog /></div>
                            <span>Editar Perfil</span>
                        </Link>
                        <Link to="#" className={styles.my_posts}>
                            <div><BsFillFilePostFill /></div>
                            <span>Meus Posts</span>
                        </Link>
                        <Link to="#" className={styles.favorite_posts}>
                            <div><FaBookmark /></div>
                            <span>Posts Favoritos</span>
                        </Link>
                        <div className={styles.signout} onClick={handleLogout}>
                            <div><FaSignOutAlt /></div>
                            <span>Sair</span>
                        </div>
                    </div>
                </>
                ) : (
                    <div className={styles.signup}>
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
                )
            }
        </nav>
    );
}

export default Navbar;