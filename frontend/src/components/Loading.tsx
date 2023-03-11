// CSS
import styles from "./Loading.module.css";

interface Props {
    type?: "full";
}

const Loading = ({ type }: Props) => {
    return (
        <div className={`${styles.loading_container} ${type ? styles["full"] : ""}`}>
            <img src="/loading.svg" alt="Animação de carregamento" />
            {type && <p>Carregando...</p>}
        </div>
    );
}

export default Loading;