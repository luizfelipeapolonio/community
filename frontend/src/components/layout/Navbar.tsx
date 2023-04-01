import styles from "./Navbar.module.css";

// Icons
import { 
    FaUsers, 
    FaUser,
    FaUserCircle, 
    FaSignOutAlt, 
    FaSearch, 
    FaBookmark, 
    FaInfoCircle 
} from "react-icons/fa";

import { Link, NavLink } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";

// Types
import { AppDispatch, RootState } from "../../config/store";
import { IUser } from "../../types/shared.types";

import { uploads } from "../../config/requestConfig";

// Reducers
import { reset, logout } from "../../slices/authSlice";
import { getCurrentUser } from "../../slices/userSlice";

const Navbar = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [toggleMenu, setToggleMenu] = useState<string>("");

    const { auth, loading } = useAuth();
    const { payload, error: userError } = useSelector((state: RootState) => state.user);
    const { success } = useSelector((state: RootState) => state.auth);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getCurrentUser());
    }, []);

    useEffect(() => {
        if(payload) {
            if(payload.status === "success" && typeof payload.message === "string") {
                if(payload.message.includes("logado")) {
                    setUser(payload.payload as IUser);
                }

                if(payload.message.includes("atualizado")) {
                    dispatch(getCurrentUser());
                }
            }

            if(userError && payload.statusCode) {
                if(payload.statusCode === 401) {
                    setError(true);
                }
            }
        }

        // Get current user data when sign in
        if(success) {
            dispatch(getCurrentUser());
        }

        dispatch(reset());
    }, [payload, userError, success]);

    useEffect(() => {
        if(error) {
            dispatch(logout());
        }
        dispatch(reset());
    }, [error]);

    const handleLogout = async () => {
        await dispatch(logout());
        dispatch(reset());
        closeDropdownMenu();
    }

    const toggleDropdownMenu = () => {
        setToggleMenu((isOpen) => isOpen ? "" : "open");
    }

    const closeDropdownMenu = () => {
        setToggleMenu("");
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
            {auth && !loading ? (
                <>
                    <div className={styles.auth_container}>
                        <NavLink 
                            to="/"
                            className={({ isActive }) => isActive ? styles.active : ""}
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to="/post"
                            className={({ isActive }) => isActive ? styles.active : ""}
                            end
                        >
                            Criar Post
                        </NavLink>
                        <div className={styles.auth_user} onClick={toggleDropdownMenu}>
                            <div className={toggleMenu ? styles.is_open : "" }>
                                {user && user.profileImage ? (
                                    <img src={`${uploads}/users/${user.profileImage}`} alt="Imagem de Perfil" />
                                ) : <FaUser />} 
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.drop_menu} ${styles[toggleMenu]}`}>
                        {user && (
                            <>
                            <div className={styles.user}>
                                <>
                                    {user.profileImage ? (
                                        <img src={`${uploads}/users/${user.profileImage}`} alt="Imagem de Perfil" />
                                    ) : <div><FaUser /></div>}
                                    <span>{user.name}</span>
                                    <p>{user.email}</p>
                                </>
                            
                            </div>
                            <Link to={`/users/${user._id}`} className={styles.edit_profile} onClick={closeDropdownMenu}>
                                <div><FaUserCircle /></div>
                                <span>Meu Perfil</span>
                            </Link>
                            <Link to="#" className={styles.favorite_posts} onClick={closeDropdownMenu}>
                                <div><FaBookmark /></div>
                                <span>Posts Favoritos</span>
                            </Link>
                            </>
                        )}
                        <Link to="#" className={styles.about} onClick={closeDropdownMenu}>
                            <div><FaInfoCircle /></div>
                            <span>Sobre</span>
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