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
    BsChatRightText 
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
import { resetPostStates, getPostById } from "../../slices/postSlice";
import { resetUserStates, getUserById } from "../../slices/userSlice";

const Post = () => {
    const [post, setPost] = useState<IPost | null>(null);
    const [user, setUser] = useState<IUser | null>(null);

    const { id } = useParams();

    const dispatch = useDispatch<AppDispatch>();
    const { payload: postPayload, loading: postLoading } = useSelector((state: RootState) => state.post);
    const { payload: userPayload, loading: userLoading } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if(!id) return;
        dispatch(getPostById(id));
    }, [id]);
    
    useEffect(() => {
        if(postPayload) {
            if(postPayload.status === "success") {
                setPost(postPayload.payload as IPost);
                dispatch(resetPostStates());
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
                        <div className={styles.like}>
                            <button type="button"><BsHandThumbsUp /></button>
                            <span>{post.likes.length}</span>
                        </div>
                        <div className={styles.dislike}>
                            <button type="button"><BsHandThumbsDown /></button>
                            <span>{post.dislikes.length}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Post;