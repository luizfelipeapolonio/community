// CSS
import styles from "./DeleteModal.module.css";

import { Dispatch, SetStateAction } from "react";

interface Props {
    postId: string;
    setModalVisibility: Dispatch<SetStateAction<boolean>>;
}

const DeleteModal = ({ postId, setModalVisibility }: Props) => {
    console.log("POSTID: ", postId);

    return (
        <div className={styles.deleteModal_fade}>
            <div className={styles.deleteModal_container}>
                <p>Tem certeza que deseja excluir o post?</p>
                <div className={styles.deleteModal_actions}>
                    <button type="button">Excluir</button>
                    <button type="button" onClick={() => setModalVisibility(false)}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;