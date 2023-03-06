// CSS
import styles from "./FlashMessage.module.css";

interface Props {
    type: "success" | "error";
    message: string
}

const FlashMessage = ({ type, message }: Props) => {
    return (
        <div className={`${styles.flash_container} ${styles[type]}`}>
            <p>{message}</p>
        </div>
    );
}

export default FlashMessage;