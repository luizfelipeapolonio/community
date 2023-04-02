// CSS
import styles from "./Profile.module.css";

// Components
import Loading from "../../components/Loading";
import DefaultUser from "../../components/layout/DefaultUser";
import Image from "../../components/Image";
import DeleteModal from "../../components/DeleteModal";

// Icons
import { FaUserEdit, FaExclamationTriangle, FaTrashAlt, FaEdit } from "react-icons/fa";

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
import { resetPostStates, getUserPosts } from "../../slices/postSlice";

const Profile = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [authUser, setAuthUser] = useState<IAuthenticatedUser | null>(null);
    const [notFound, setNotFound] = useState<boolean>(false);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [postId, setPostId] = useState<string>("");

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
        } else {
            setAuthUser(null);
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
                    setUser(null);
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
                dispatch(resetPostStates());
            }

            if(userPosts.status === "success" && typeof userPosts.message === "string") {
                if(userPosts.message.includes("excluído")) {
                    if(!id) return;
                    dispatch(getUserPosts(id));
                }
            }
        }
    }, [userPosts]);

    // Hide or show scroll bar if modal is open/closed
    useEffect(() => {
        if(isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const openDeleteModal = (postId: string) => {
        setIsOpen(true);
        setPostId(postId);
    }

    return (
        <div className={styles.profile_container}>
            {(loading || postsLoading) ? <Loading /> : (
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
                            <div>
                                <span>{posts.length}</span>
                                {posts.length === 1 ? <p>Post</p> : <p>Posts</p>}
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
                    <div className={styles.posts_grid}>
                        {user && posts.length > 0 && (
                            posts.map((post) => (
                                <div className={styles.postcard} key={post._id}>
                                    <Link to="#">{post.title}</Link>
                                    <img 
                                        src={`${uploads}/posts/${post.image}`}
                                        alt={post.title}
                                        loading="lazy"
                                    />
                                    {isAuthUser && !authLoading && (
                                        <div className={styles.post_actions}>
                                            <button type="button" onClick={() => openDeleteModal(post._id)}>
                                                <FaTrashAlt />
                                                Excluir
                                            </button>
                                            <Link to={`/post/${post._id}/edit`}>
                                                <FaEdit />
                                                Editar
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                    {user && posts.length === 0 && <p className={styles.noposts}>Ainda não há posts</p>}
                    {isOpen && (
                        <DeleteModal postId={postId} setModalVisibility={setIsOpen} />
                    )}
                </>
            )}
        </div>
    );
}

export default Profile;