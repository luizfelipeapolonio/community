// CSS
import styles from "./Post.module.css";

// Components
import Image from "../../components/Image";
import Loading from "../../components/Loading";

// Icons
import { 
    BsHandThumbsUp,
    BsHandThumbsUpFill,
    BsHandThumbsDown,
    BsHandThumbsDownFill,
    BsChatRightText,
    BsBookmarkStar,
    BsFillBookmarkStarFill
} from "react-icons/bs";

// Types
import { AppDispatch, RootState } from "../../config/store";
import { IPost, IUser } from "../../types/shared.types";

import { uploads } from "../../config/requestConfig";

import { Link } from "react-router-dom";

// Hooks
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Reducers
import { resetPostStates, getPostById, likePost, dislikePost } from "../../slices/postSlice";
import { resetUserStates, getUserById } from "../../slices/userSlice";

const Post = () => {
    const [post, setPost] = useState<IPost | null>(null);
    const [user, setUser] = useState<IUser | null>(null);

    const { id } = useParams();

    const dispatch = useDispatch<AppDispatch>();
    const { payload: postPayload, loading: postLoading, post: postState } = useSelector((state: RootState) => state.post);
    const { payload: userPayload, loading: userLoading } = useSelector((state: RootState) => state.user);
    const { user: authUser } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if(!id) return;
        dispatch(getPostById(id));
    }, [id]);
    
    useEffect(() => {
        if(postPayload) {
            if(postPayload.status === "success" && typeof postPayload.message === "string") {
                if(postPayload.message.includes("Post encontrado")) {
                    setPost(postPayload.payload as IPost);
                    dispatch(resetPostStates());
                }
            }
        }
    }, [postPayload]);

    useEffect(() => {
        if(post) {
            dispatch(getUserById(post.userId));
        }
    }, [post]);

    useEffect(() => {
        if(userPayload) {
            if(userPayload.status === "success") {
                setUser(userPayload.payload as IUser);
                dispatch(resetUserStates());
            }
        }
    }, [userPayload]);

    const like = async () => {
        if(!id) return;
        await dispatch(likePost(id));
    }

    const dislike = async () => {
        if(!id) return;
        await dispatch(dislikePost(id));
    }

    console.log("POST: ", postState);

    return (
        <div className={styles.postDetails_container}>
            {(!post || !user) && <Loading />}
            {post && user && (
                <div className={styles.postDetails}>
                    <h1>{post.title}</h1>
                    <div className={styles.user}>
                        Publicado por:
                        <Image 
                            src={`${uploads}/users/${user.profileImage}`}
                            alt={user.name}
                            width="30px"
                            height="30px"
                            placeholderWidth="30px"
                            placeholderHeight="30px"
                            borderRadius="50%"
                        />
                        <Link to={`/users/${user._id}`}>{user.name}</Link>
                    </div>
                    <div className={styles.tags}>
                        {post.tags.map((tag) => (
                            <span key={tag}>#{tag.toLowerCase()}</span>
                        ))}
                    </div>
                    <div className={styles.content}>{post.content}</div>
                    <div>
                        <Image 
                            src={`${uploads}/posts/${post.image}`}
                            alt={post.title}
                            width="100%"
                            height="400px"
                            placeholderWidth="100%"
                            placeholderHeight="400px"
                            borderRadius="8px"
                        />
                    </div>
                    <div className={styles.social}>
                        {postState && authUser && (
                        <>
                            <div className={styles.like_dislike}>
                                <div className={styles.like}>
                                    <button type="button" onClick={like}>
                                        {postState.likes.includes(authUser._id) ? 
                                            <BsHandThumbsUpFill /> : <BsHandThumbsUp />
                                        }
                                    </button>
                                    <span>{postState.likes.length}</span>
                                </div>
                                <div className={styles.dislike}>
                                    <button type="button" onClick={dislike}>
                                        {postState.dislikes.includes(authUser._id) ? 
                                            <BsHandThumbsDownFill /> : <BsHandThumbsDown />
                                        }
                                    </button>
                                    <span>{postState.dislikes.length}</span>
                                </div>
                            </div>
                            <div className={styles.favorite}>
                                <button type="button"><BsBookmarkStar /></button>
                            </div>
                        </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Post;