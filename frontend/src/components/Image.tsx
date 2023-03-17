// CSS
import styles from "./Image.module.css";

import { useState } from "react";

interface Props {
    src: string;
    alt: string;
}

const Image = ({ src, alt }: Props) => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    return (
        <div className={styles.image_container}>
            <div
                className={styles.placeholder}
                style={{ display: isLoaded ? "none" : "block"}}
            />
            <img 
                style={{ display: isLoaded ? "block" : "none" }}
                src={src} 
                alt={alt}
                loading="lazy"
                onLoad={() => setIsLoaded(true)} 
            />
        </div>
    );
}

export default Image;