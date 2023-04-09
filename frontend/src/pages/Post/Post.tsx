// CSS
import styles from "./Post.module.css";

// Components
import Image from "../../components/Image";
import Loading from "../../components/Loading";
import DefaultUser from "../../components/layout/DefaultUser";

// Icons
import { 
    BsHandThumbsUp,
    BsHandThumbsUpFill,
    BsHandThumbsDown,
    BsHandThumbsDownFill,
    BsChatRightText,
    BsBookmarkStar,
    BsFillBookmarkStarFill,
    BsThreeDotsVertical
} from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";

// Types
import { AppDispatch, RootState } from "../../config/store";
import { IPost, IUser } from "../../types/shared.types";

import { uploads } from "../../config/requestConfig";

import { Link } from "react-router-dom";

// Hooks
import { useParams } from "react-router-dom";
import { useState, useEffect, FormEvent, MouseEvent } from "react";
import { useSelector, useDispatch } from "react-redux";

// Reducers
import { 
    resetPostStates, 
    getPostById, 
    likePost, 
    dislikePost, 
    insertComment,
    deleteComment 
} from "../../slices/postSlice";
import { resetUserStates, getUserById } from "../../slices/userSlice";

const Post = () => {
    const [post, setPost] = useState<IPost | null>(null);
    const [user, setUser] = useState<IUser | null>(null);
    const [comment, setComment] = useState<string>("");
    const [isCommentInputFocused, setIsCommentInputFocused] = useState<boolean>(false);
    const [toggleDeleteButton, setToggleDeleteButton] = useState<boolean>(false);
    const [commentId, setCommentId] = useState<string>("");
    
    const { id } = useParams();

    const dispatch = useDispatch<AppDispatch>();
    const { payload: postPayload, loading: postLoading, post: postState } = useSelector((state: RootState) => state.post);
    const { payload: userPayload } = useSelector((state: RootState) => state.user);
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

    const handleInsertComment = async (e: FormEvent) => {
        e.preventDefault();

        if(!id) return;

        await dispatch(insertComment({ id, content: comment }));
        dispatch(resetPostStates());

        cleanupComment();
    }

    const cleanupComment = () => {
        setIsCommentInputFocused(false);
        setComment("");
    }

    const toggleDeleteCommentButton = (e: MouseEvent<HTMLButtonElement>) => {
        setCommentId(e.currentTarget.id);
        setToggleDeleteButton((visibility) => !visibility);
    }

    const handleDeleteComment = async(commentId: string) => {
        if(!id) return;

        const comment = {
            id,
            commentId
        }

        await dispatch(deleteComment(comment));
        dispatch(resetPostStates());
        
        setToggleDeleteButton(false);
    }

    // console.log("POST: ", postState);
    console.log("POST PAYLOAD: ", postPayload);

    return (
        <div className={styles.postDetails_container}>
            {(!post || !user) && <Loading />}
            {post && user && (
            <>
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
                <div className={styles.comments_container}>
                    {postState && (
                        <>
                            <div className={styles.commentsCount}>
                                <span><BsChatRightText /> {postState.comments.length}</span>
                                {postState.comments.length === 1 ? <p>comentário</p> : <p>comentários</p>}
                            </div>
                            <form onSubmit={handleInsertComment}>
                                <input 
                                    type="text" 
                                    placeholder="Adicione um comentário..." 
                                    value={comment}
                                    onFocus={() => setIsCommentInputFocused(true)}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <div className={styles.underline}></div>
                                {isCommentInputFocused && (
                                    <div className={styles.buttons}>
                                        <button 
                                            type="button" 
                                            onClick={cleanupComment}
                                        >
                                            Cancelar
                                        </button>
                                        <input type="submit" value="Comentar" disabled={comment === "" ? true : false} />
                                    </div>
                                )}
                            </form>
                            {postState && postState.comments.length > 0 ? (
                                <div className={styles.commentsList}>
                                    {postLoading ? <Loading /> : (
                                        postState.comments.map((comment) => (
                                            <div key={comment._id} className={styles.comment}>
                                                {comment.profileImage ? (
                                                    <Image 
                                                        src={`${uploads}/users/${comment.profileImage}`}
                                                        alt={comment.userName}
                                                        width="32px"
                                                        height="32px"
                                                        placeholderWidth="32px"
                                                        placeholderHeight="32px"
                                                        borderRadius="50%"
                                                    />
                                                ) : <DefaultUser size="32px" fontSize="1.6rem" />}
                                                <div className={styles.commentContent}>
                                                    <span>{comment.userName}</span>
                                                    <p>{comment.content}</p>
                                                </div>
                                                <div className={styles.deleteComment}>
                                                    {authUser && authUser._id === comment.userId && (
                                                        <>
                                                            <button 
                                                                type="button" 
                                                                id={comment._id} 
                                                                className={styles.drop_button} 
                                                                onClick={toggleDeleteCommentButton}
                                                            >
                                                                <BsThreeDotsVertical />
                                                            </button>
                                                            <div 
                                                                className={styles.deleteComment_dropdown} 
                                                                style={{
                                                                    display: commentId === comment._id && toggleDeleteButton ? "block" : "none"
                                                                }}
                                                            >
                                                                <button type="button" onClick={() => handleDeleteComment(comment._id)}>
                                                                    <FaTrashAlt />
                                                                    <span>Excluir</span>
                                                                </button>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            ) : (
                                <p style={{ textAlign: "center", fontSize: "2rem" }}>
                                    Ainda não há comentários
                                </p>
                            )}
                        </>
                    )}
                </div>
            </>
            )}
        </div>
    );
}

export default Post;