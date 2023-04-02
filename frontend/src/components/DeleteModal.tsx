// CSS
import styles from "./DeleteModal.module.css";

// Types
import { Dispatch, SetStateAction } from "react";
import { AppDispatch } from "../config/store";

// Hooks
import { useDispatch } from "react-redux";

// Reducers
import { deletePost } from "../slices/postSlice";

interface Props {
    postId: string;
    setModalVisibility: Dispatch<SetStateAction<boolean>>;
}

const DeleteModal = ({ postId, setModalVisibility }: Props) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleDelete = async () => {
        await dispatch(deletePost({ id: postId }));
        setModalVisibility(false);
    }

    return (
        <div className={styles.deleteModal_fade}>
            <div className={styles.deleteModal_container}>
                <p>Tem certeza que deseja excluir o post?</p>
                <div className={styles.deleteModal_actions}>
                    <button type="button" onClick={handleDelete}>Excluir</button>
                    <button type="button" onClick={() => setModalVisibility(false)}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;