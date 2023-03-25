// CSS
import styles from "./ProfileImage.module.css";

import { useState, useRef } from "react";
import { usePlaceholderImage } from "../hooks/usePlaceholderImage";

interface Props {
    src: string;
    alt: string;
    width?: string;
    height?: string;
    borderRadius?: string;
    placeholderWidth?: string;
    placeholderHeight?: string;
}

const Image = ({ src, alt, width, height, placeholderWidth, placeholderHeight, borderRadius }: Props) => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const divRef = useRef<HTMLDivElement>(null!);

    usePlaceholderImage(divRef, setIsLoaded);

    return (
        <div className={styles.image_container}>
            <div
                className={styles.placeholder}
                style={{ 
                    width: placeholderWidth,
                    height: placeholderHeight,
                    borderRadius
                }}
                ref={divRef}
            >
                <img 
                    style={{ 
                        display: isLoaded ? "block" : "none",
                        width,
                        height,
                        borderRadius
                    }}
                    src={src} 
                    alt={alt}
                    loading="lazy"
                />
            </div>
        </div>
    );
}

export default Image;