// CSS
import styles from "./PostCard.module.css";

// Components
import Image from "./Image";
import { Link } from "react-router-dom";

// Icons
import { BsHandThumbsUp, BsHandThumbsDown, BsChatRightText } from "react-icons/bs";

import { uploads } from "../config/requestConfig";

// Types
import { IPost } from "../types/shared.types";

interface Props {
    post: IPost;
}

const PostCard = ({ post }: Props) => {
    return (
        <div className={styles.postcard} key={post._id}>
            <Link to={`/post/${post._id}`} className={styles.title}>{post.title}</Link>
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
                    <Image 
                        src={`${uploads}/posts/${post.image}`} 
                        alt={post.title}
                        width="100%"
                        height="15rem"
                        placeholderWidth="100%"
                        placeholderHeight="15rem"
                        borderRadius="5px"
                    />
                </div>
            </div>
            <div className={styles.social}>
                <div className={styles.like_dislike}>
                    <div className={styles.like}>
                        <button type="button">
                            <BsHandThumbsUp /> 
                        </button>
                        <span>{post.likes.length}</span>
                    </div>
                    <div className={styles.dislike}>
                        <button type="button">
                            <BsHandThumbsDown />
                        </button>
                        <span>{post.dislikes.length}</span>
                    </div>
                </div>
                <div className={styles.comments}>
                    <button type="button">
                        <BsChatRightText />
                    </button>
                    <span>{post.comments.length}</span>
                </div>
            </div>
        </div>
    );
}

export default PostCard;