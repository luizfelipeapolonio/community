// CSS
import styles from "./Home.module.css";

// Components
import ProfileImage from "../../components/ProfileImage";

// Icons
import { 
    BsHandThumbsUp,
    BsHandThumbsUpFill,
    BsHandThumbsDown,
    BsHandThumbsDownFill,
    BsChatRightText 
} from "react-icons/bs";

// Types
import { IPost } from "../../types/shared.types";
import { AppDispatch, RootState } from "../../config/store";

import { uploads } from "../../config/requestConfig";

import { Link } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Reducers
import { getAllPosts } from "../../slices/postSlice";

const Home = () => {
    const [posts, setPosts] = useState<IPost[]>([]);

    const { payload: allPosts } = useSelector((state: RootState) => state.post);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getAllPosts());
    }, []);

    useEffect(() => {
        if(allPosts) {
            if(allPosts.status === "success") {
                setPosts(allPosts.payload as IPost[]);
            }
        }
    }, [allPosts]);

    console.log("ALL POSTS: ", posts);

    return (
        <div className={styles.home_container}>
            {posts.length > 0 && (
                posts.map((post) => (
                    <div className={styles.home_postcard} key={post._id}>
                        <Link to="#" className={styles.title}>{post.title}</Link>
                        <p>
                            Publicado por: <Link to={`/users/${post.userId}`}>{post.userName}</Link>
                        </p>
                        <div className={styles.post_tags}>
                            {post.tags.map((tag) => (
                                <span key={tag}>#{tag.toLowerCase()}</span>
                            ))}
                        </div>
                        <div className={styles.post_content}>
                            <div className={styles.content}>
                                {post.content}
                            </div>
                            <div className={styles.post_image}>
                                <img src={`${uploads}/posts/${post.image}`} alt={post.title} />
                            </div>
                        </div>
                        <div className={styles.social}>
                                <div className={styles.like_dislike}>
                                    <button type="button">
                                        <BsHandThumbsUp /> 
                                        {post.likes.length}
                                    </button>
                                    <button type="button">
                                        <BsHandThumbsDown />
                                        {post.dislikes.length}
                                    </button>
                                </div>
                                <div className={styles.comments}>
                                    <span><BsChatRightText /> {post.comments.length}</span>
                                </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Home;