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
import { BsFillFilePostFill } from "react-icons/bs";

import { Link, NavLink } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";

// Types
import { AppDispatch, RootState } from "../../config/store";
import { IUser } from "../../types/userService.types";

import { uploads } from "../../config/requestConfig";

// Reducers
import { reset, logout } from "../../slices/authSlice";
import { getUserProfile } from "../../slices/userSlice";

const Navbar = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [toggleMenu, setToggleMenu] = useState<string>("");

    const { auth, loading } = useAuth();
    const { payload, error } = useSelector((state: RootState) => state.user);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if(payload) {
            if(payload.status === "success") {
                setUser(payload.payload as IUser);
            }
        }

        if(error) {
            dispatch(logout());
        }

        if(auth) {
            dispatch(getUserProfile());
        }

    }, [payload, error, auth]);

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
            {auth && !loading ? (
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
                            <Link to={`/users/${user._id}`} className={styles.edit_profile}>
                                <div><FaUserCircle /></div>
                                <span>Meu Perfil</span>
                            </Link>
                            {/* <Link to="#" className={styles.my_posts}>
                                <div><BsFillFilePostFill /></div>
                                <span>Meus Posts</span>
                            </Link> */}
                            <Link to="#" className={styles.favorite_posts}>
                                <div><FaBookmark /></div>
                                <span>Posts Favoritos</span>
                            </Link>
                            </>
                        )}
                        <Link to="#" className={styles.about}>
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