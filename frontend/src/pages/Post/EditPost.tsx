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

// Reducers
import { resetPostStates, getPostById } from "../../slices/postSlice";

const EditPost = () => {
    const [post, setPost] = useState<IPost | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [content, setContent] = useState<string>("");

    const { id } = useParams();

    const dispatch = useDispatch<AppDispatch>();
    const { payload, loading } = useSelector((state: RootState) => state.post);

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
        }
    }, [payload]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    }

    const handleTags = (e: ChangeEvent<HTMLInputElement>) => {
        const tagsArray: string[] = e.target.value.split(",").map((tag) => {
            return tag.trim().replace(" ", "-").toLocaleLowerCase();
        });
        setTags(tagsArray);
    }

    console.log("POST", post);

    return (
        <div className={styles.postform_container}>
            {!post && loading ? <Loading /> : (
                <>
                    <h2>Editar Post</h2>
                    <p>Edite as tags ou ajuste o contéudo do seu post</p>
                    {post && (
                        <div className={styles.image}>
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
                    {/* {message && (
                        <FlashMessage 
                            type={error ? "error" : "success"} 
                            message={message} 
                        />
                    )} */}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="title">Título</label>
                        <div className={styles.title}>
                            <BsFonts />
                            <input 
                                type="text" 
                                id="title"
                                value={post ? post.title : ""} 
                                placeholder="Título da postagem"
                                readOnly
                            />
                        </div>

                        <label htmlFor="tags">Tags</label>
                        <div className={styles.tags}>
                            <BsFillTagsFill />
                            <input 
                                type="text" 
                                id="tags" 
                                value={post ? post.tags : tags}
                                placeholder="Separe as tags por vírgula. Ex: tag1, tag2" 
                                onChange={handleTags}
                            />
                        </div>
                        
                        <label htmlFor="content">Conteúdo</label>
                        <div className={styles.content}>
                            <textarea 
                                id="content"
                                rows={10} 
                                value={content}
                                placeholder="O que você gostaria de compartilhar?"
                                onChange={(e) => setContent(e.target.value)} 
                            />
                        </div>
                        <input type="submit" value="Salvar" />
                        {/* {!loading && <input type="submit" value="Salvar" />}
                        {loading && <input type="submit" value="Aguarde..." disabled />} */}
                    </form>
                </>
            )}
        </div>
    );
}

export default EditPost;