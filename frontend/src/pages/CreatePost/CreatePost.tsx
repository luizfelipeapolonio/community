// CSS
import styles from "./CreatePost.module.css";

// Icons
import { BsFonts, BsFillTagsFill } from "react-icons/bs";
import { FaFileImage, FaTimes } from "react-icons/fa";

import { useState, useRef, FormEvent, ChangeEvent } from "react";

const CreatePost = () => {
    const [title, setTitle] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [content, setContent] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);

    const imageInputRef = useRef<HTMLInputElement>(null!);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const post = {
            title,
            tags,
            image,
            content
        }

        console.log(post);
    }

    const handleTags = (e: ChangeEvent<HTMLInputElement>) => {
        const tagsArray: string[] = e.target.value.split(",").map((tag) => {
            return tag.trim().replace(" ", "-").toLocaleLowerCase();
        });

        setTags(tagsArray);
    }

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const image: File | null = e.target.files ? e.target.files[0] : null;

        setImage(image);
    }

    const clearImage = () => {
        setImage(null);
        imageInputRef.current.value = "";
    }

    return (
        <div className={styles.createpost_container}>
            <h2>Criar Post</h2>
            <p>Compartilhe conhecimento e coisas do seu interesse!</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Título</label>
                <div className={styles.title}>
                    <BsFonts />
                    <input 
                        type="text" 
                        id="title" 
                        placeholder="Título da postagem"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <label htmlFor="tags">Tags</label>
                <div className={styles.tags}>
                    <BsFillTagsFill />
                    <input 
                        type="text" 
                        id="tags" 
                        placeholder="Separe as tags por vírgula. Ex: tag1, tag2" 
                        onChange={handleTags}
                    />
                </div>
                
                <label htmlFor="content">Conteúdo</label>
                <div className={styles.content}>
                    <textarea 
                        id="content"
                        rows={10} 
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

                {image && <img src={URL.createObjectURL(image)} alt="Imagem do post" loading="lazy" />}

                <input type="submit" value="Criar" />
            </form>
        </div>
    );
}

export default CreatePost;