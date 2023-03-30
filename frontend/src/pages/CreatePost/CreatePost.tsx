// CSS
import styles from "./CreatePost.module.css";

// Components
import FlashMessage from "../../components/FlashMessage";

// Icons
import { BsFonts, BsFillTagsFill } from "react-icons/bs";
import { FaFileImage, FaTimes } from "react-icons/fa";

// Types
import { AppDispatch, RootState } from "../../config/store";

// Hooks
import { useState, useRef, useEffect, FormEvent, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

// Reducers
import { createPost } from "../../slices/postSlice";
import { IPostCreateBody } from "../../types/postSlice.types";

// Utils
import { extractFormMessages } from "../../utils/extractFormMessages";

const CreatePost = () => {
    const [title, setTitle] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [content, setContent] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const imageInputRef = useRef<HTMLInputElement>(null!);

    const dispatch = useDispatch<AppDispatch>();
    const { payload, error: postError, loading } = useSelector((state: RootState) => state.post);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const post = {
            title,
            tags,
            content,
            image,
        }

        const formData: FormData = new FormData();

        Object.entries(post).forEach((value) => {
            if(value[1] instanceof Array<string>) {
                const tagsArray = value[1] as string[];

                tagsArray.map((tag, index) => {
                    formData.append(`tags[${index}]`, tag);
                });
            } else {
                formData.append(value[0], value[1] as (string | File));
            }
        });

        await dispatch(createPost((formData as unknown) as IPostCreateBody));
    }

    const handleTags = (e: ChangeEvent<HTMLInputElement>) => {
        const tagsArray: string[] = e.target.value.split(",").map((tag) => {
            return tag.trim().replace(" ", "-").toLocaleLowerCase();
        });
        setTags(tagsArray);
    }

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const image: File | null = e.target.files ? e.target.files[0] : null;

        if(image && !image.name.match(/\.(png|jpg)$/i)) {
            setError(true);
            setMessage("Por favor, envie apenas imagens png ou jpg!");
            clearImage();            
            return;
        }

        setImage(image);
    }

    const clearImage = () => {
        setImage(null);
        imageInputRef.current.value = "";
    }

    // Set up message state
    useEffect(() => {
        if(payload) {
            if(typeof payload.message === "string") {
                setMessage(payload.message);
            } else {
                const extractedMessages = extractFormMessages(payload);

                if(extractedMessages) {
                    setMessage(extractedMessages[0]);
                }
            }

            if(payload.statusCode && payload.statusCode === 201) {
                setTitle("");
                setTags([]);
                setContent("");
                clearImage();
            }
        }

        if(postError) {
            setError(true);
        } else {
            setError(false);
        }
    }, [payload, postError]);

    // Check if there is message, if so, scroll to top and clean up then
    useEffect(() => {
        if(message && !loading) {
            window.scrollTo({top: 0, behavior:"smooth"});
        }

        if(message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message, loading]);

    return (
        <div className={styles.createpost_container}>
            <h2>Criar Post</h2>
            <p>Compartilhe conhecimento e coisas do seu interesse!</p>
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
                        value={title} 
                        placeholder="Título da postagem"
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                    />
                </div>

                <label htmlFor="tags">Tags</label>
                <div className={styles.tags}>
                    <BsFillTagsFill />
                    <input 
                        type="text" 
                        id="tags" 
                        value={tags}
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
                
                <label htmlFor="image">Imagem</label>
                <div className={styles.image}>
                    <FaFileImage />
                    <input id="image" type="file" ref={imageInputRef} onChange={handleFile} />
                    <button type="button" onClick={clearImage}>
                        <FaTimes />
                    </button>
                </div>
                
                {image && (
                    <img 
                        src={URL.createObjectURL(image)} 
                        alt="Imagem do post" loading="lazy" 
                    />
                )}
                {!loading && <input type="submit" value="Criar" />}
                {loading && <input type="submit" value="Aguarde..." disabled />}
            </form>
        </div>
    );
}

export default CreatePost;