// CSS
import styles from "./Profile.module.css";

// Components
import Loading from "../../components/Loading";
import DefaultUser from "../../components/layout/DefaultUser";
import Image from "../../components/Image";
import PostCard from "../../components/PostCard";

// Icons
import { FaUserEdit, FaExclamationTriangle } from "react-icons/fa";

// Types
import { RootState, AppDispatch } from "../../config/store";
import { IUser, IPost } from "../../types/shared.types";
import { IAuthenticatedUser } from "../../types/authSlice.types";

import { Link } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";

import { uploads } from "../../config/requestConfig";

// Reducers
import { getUserById } from "../../slices/userSlice";
import { getUserPosts } from "../../slices/postSlice";

const Profile = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [authUser, setAuthUser] = useState<IAuthenticatedUser | null>(null);
    const [notFound, setNotFound] = useState<boolean>(false);
    const [posts, setPosts] = useState<IPost[]>([]);

    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const { user: authenticatedUser } = useSelector((state: RootState) => state.auth);
    const { payload, loading } = useSelector((state: RootState) => state.user);
    const { payload: userPosts, loading: postsLoading } = useSelector((state: RootState) => state.post);
    
    const { auth, loading: authLoading } = useAuth();

    const isAuthUser: boolean = user?._id === authUser?._id && auth;

    useEffect(() => {
        if(!id) return;
        dispatch(getUserById(id));
        dispatch(getUserPosts(id));
    }, [id]);

    useEffect(() => {
        if(auth) {
            setAuthUser(authenticatedUser);
        }
    }, [auth]);

    // Set user states
    useEffect(() => {
        if(payload) {
            if(payload.status === "success" && typeof payload.message === "string") {
                if(payload.message.includes("encontrado")) {
                    setUser(payload.payload as IUser);
                    setNotFound(false);
                }
            }

            if(payload.status === "error" && payload.statusCode) {
                if(payload.statusCode === 404) {
                    setNotFound(true);
                }
            }
        }
    }, [payload]);

    // Set post state
    useEffect(() => {
        if(userPosts) {
            if(userPosts.status === "success") {
                setPosts(userPosts.payload as IPost[]);
            }
        }
    }, [userPosts]);

    console.log("POSTS: ", posts);

    return (
        <div className={styles.profile_container}>
            {loading ? <Loading /> : (
                <>
                    {user && !notFound && (
                        <div className={styles.user_info}>
                            <div>
                                {user.profileImage ? (
                                    <Image src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
                                ) : <DefaultUser />}
                                
                                {isAuthUser && !authLoading && (
                                    <Link to={`/users`}>
                                        <FaUserEdit /> Editar Perfil
                                    </Link>
                                )}
                            </div>
                            <div>
                                <span>{user.name}</span>
                                {user.bio && <p>{user.bio}</p>}
                            </div>
                        </div>
                    )}
                    {notFound && (
                        <div className={styles.notfound}>
                            <FaExclamationTriangle />
                            <h1>Oops</h1>
                            <p>Usuário não encontrado!</p>
                        </div>
                    )}
                </>
            )}
            <Link to="/users/63f6628a51e72cba9b722c7d">clica</Link>
            <Link to="/users/asdfasdfsadfsafdfas">Not found</Link>
        </div>
    );
}

export default Profile;