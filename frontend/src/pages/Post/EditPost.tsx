// CSS
import styles from "./PostForm.module.css";

// Components
import FlashMessage from "../../components/FlashMessage";
import Image from "../../components/Image";
import Loading from "../../components/Loading";

// Icons
import { BsFonts, BsFillTagsFill } from "react-icons/bs";

//Types
import { AppDispatch, RootState } from "../../config/store";
import { IPost } from "../../types/shared.types";

import { uploads } from "../../config/requestConfig";

// Hooks
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Utils
import { extractFormMessages } from "../../utils/extractFormMessages";

// Reducers
import { resetPostStates, getPostById, updatePost } from "../../slices/postSlice";

const EditPost = () => {
    const [post, setPost] = useState<IPost | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [content, setContent] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const { id } = useParams();

    const dispatch = useDispatch<AppDispatch>();
    const { payload, loading, error: postError } = useSelector((state: RootState) => state.post);

    useEffect(() => {
        if(!id) return;
        dispatch(getPostById(id));
    }, []);

    useEffect(() => {
        if(payload) {
            if(payload.status === "success") {
                setPost(payload.payload as IPost);
                dispatch(resetPostStates());
            }

            if(typeof payload.message === "string" && payload.message.includes("Post encontrado")) return;

            if(typeof payload.message === "string") {
                setMessage(payload.message);
            } else {
                const extractedMessages: string[] | undefined = extractFormMessages(payload);

                if(extractedMessages) {
                    setMessage(extractedMessages[0]);
                }
            }
        }

        if(postError) {
            setError(true);
        } else {
            setError(false);
        }

    }, [payload, postError]);

    useEffect(() => {
        if(post) {
            setTags(post.tags);
            setContent(post.content);
        }
    }, [post]);

    useEffect(() => {
        if(message && !loading) {
            window.scrollTo({top: 0, behavior: "smooth"});
        }

        if(message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const body = {
            tags,
            content
        }

        if(!id) return;

        await dispatch(updatePost({id, body}));
    }

    const handleTags = (e: ChangeEvent<HTMLInputElement>) => {
        const tagsArray: string[] = e.target.value.split(",").map((tag) => {
            return tag.trim().replace(" ", "-").toLocaleLowerCase();
        });
        setTags(tagsArray);
    }

    return (
        <div className={styles.postform_container}>
            {!post && loading ? <Loading /> : (
                <>
                    <h2>Editar Post</h2>
                    <p>Edite as tags ou ajuste o contéudo do seu post</p>
                    {post && (
                        <div className={styles.postedImage}>
                            <Image 
                                src={`${uploads}/posts/${post.image}`}
                                alt={post.title}
                                width="300px"
                                height="150px"
                                placeholderWidth="300px"
                                placeholderHeight="150px"
                                borderRadius="5px"
                            />
                        </div>
                    )}
                    {message && (
                        <FlashMessage 
                            type={error ? "error" : "success"} 
                            message={message} 
                        />
                    )}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="title">Título</label>
                        <div className={styles.title}>
                            <BsFonts />
                            <input 
                                type="text" 
                                id="title"
                                value={post ? post.title : ""} 
                                placeholder="Título da postagem"
                                disabled
                            />
                        </div>

                        <label htmlFor="tags">Tags</label>
                        <div className={styles.tags}>
                            <BsFillTagsFill />
                            <input 
                                type="text" 
                                id="tags" 
                                value={tags || ""}
                                placeholder="Separe as tags por vírgula. Ex: tag1, tag2" 
                                onChange={handleTags}
                            />
                        </div>
                        
                        <label htmlFor="content">Conteúdo</label>
                        <div className={styles.content}>
                            <textarea 
                                id="content"
                                rows={13} 
                                value={content || ""}
                                placeholder="O que você gostaria de compartilhar?"
                                onChange={(e) => setContent(e.target.value)} 
                            />
                        </div>
                        {!loading && <input type="submit" value="Salvar" />}
                        {loading && <input type="submit" value="Aguarde..." disabled />}
                    </form>
                </>
            )}
        </div>
    );
}

export default EditPost;