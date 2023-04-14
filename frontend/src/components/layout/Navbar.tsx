import styles from "./Navbar.module.css";

// Components
import Image from "../Image";

// Icons
import { 
    FaUsers, 
    FaUser,
    FaUserCircle, 
    FaSignOutAlt, 
    FaSearch, 
    FaBookmark, 
    FaInfoCircle,
    FaHome 
} from "react-icons/fa";
import { BsFillFileRichtextFill, BsList, BsX } from "react-icons/bs";

import { Link, NavLink } from "react-router-dom";

// Hooks
import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
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
    // Get window width
    const getWindowWidth = (): number => {
        const { innerWidth } = window;
        return innerWidth;
    }
    
    const [windowWidth, setWindowWidth] = useState<number>(getWindowWidth());

    const [user, setUser] = useState<IUser | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [toggleMenu, setToggleMenu] = useState<string>("");
    const [search, setSearch] = useState<string>("");

    const navigate = useNavigate();

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

    // Get the window width when it is resized
    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(getWindowWidth());
        }

        window.addEventListener("resize", handleWindowResize)

        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

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

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        setSearch("");

        if(search) {
            return navigate(`/search?q=${search}`);
        }
    }

    return (
        <nav className={styles.nav_container}>
            <div className={styles.logo}>
                <Link to="/">
                    <FaUsers />
                    <h1>Community</h1>
                </Link>
            </div>
            <form className={styles.search} onSubmit={handleSearch} >
                <input 
                    type="text" 
                    placeholder="Busque pelo título ou tag" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button><FaSearch /></button>
            </form>
            {auth && !loading ? (
                <>
                    <div className={styles.auth_container}>
                        <NavLink 
                            to="/"
                            className={({ isActive }) => isActive ? styles.active : ""}
                            style={{ display: windowWidth < 580 ? "none" : "flex" }}
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to="/post"
                            className={({ isActive }) => isActive ? styles.active : ""}
                            end
                            style={{ display: windowWidth < 580 ? "none" : "flex" }}
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
                                        <Image 
                                            src={`${uploads}/users/${user.profileImage}`} 
                                            alt="Imagem de Perfil"
                                            width="48px"
                                            height="48px"
                                            placeholderWidth="48px"
                                            placeholderHeight="48px"
                                            borderRadius="50%"
                                        />
                                    ) : <div className={styles.defaultUser}><FaUser /></div>}
                                    <span>{user.name}</span>
                                    <p>{user.email}</p>
                                </>
                            
                            </div>
                            <Link 
                                to="/" 
                                className={styles.home} 
                                style={{ display: windowWidth < 580 ? "flex" : "none" }} 
                                onClick={closeDropdownMenu}
                            >
                                <div><FaHome /></div>
                                <span>Home</span>
                            </Link>
                            <Link 
                                to="/post" 
                                className={styles.create_post} 
                                style={{ display: windowWidth < 580 ? "flex" : "none" }} 
                                onClick={closeDropdownMenu}
                            >
                                <div><BsFillFileRichtextFill /></div>
                                <span>Criar Post</span>
                            </Link>
                            <Link to={`/users/${user._id}`} className={styles.edit_profile} onClick={closeDropdownMenu}>
                                <div><FaUserCircle /></div>
                                <span>Meu Perfil</span>
                            </Link>
                            <Link to="/favorites" className={styles.favorite_posts} onClick={closeDropdownMenu}>
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
                        <>
                            {windowWidth > 490 ? (
                            <>
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
                            </>):(
                                <div className={styles.signupDrop}>
                                    <button onClick={toggleDropdownMenu}>
                                        {toggleMenu ? <BsX /> : <BsList />}
                                    </button>
                                    <div className={`${styles.drop_menu} ${styles[toggleMenu]}`}>
                                        <NavLink to="/login" onClick={closeDropdownMenu}>
                                            Entrar
                                        </NavLink>
                                        <NavLink to="/register" onClick={closeDropdownMenu}>
                                            Cadastrar
                                        </NavLink>
                                    </div>
                                </div>
                            )}
                        </>
                    </div>
                )
            }
        </nav>
    );
}

export default Navbar;