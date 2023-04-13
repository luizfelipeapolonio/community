// CSS
import styles from "./RootBoundary.module.css";

// Icons
import { BsFillExclamationOctagonFill } from "react-icons/bs";

import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

const RootBoundary = () => {
    const error = useRouteError();

    if(isRouteErrorResponse(error) && error.status === 404) {
        return (
            <div className={styles.notFound_container}>
                <BsFillExclamationOctagonFill />
                <h1>Oops!</h1>
                <p>{error.status}</p>
                <h3>Página não encontrada</h3>
                <Link to="/">Voltar para página inicial</Link>
            </div>
        );
    } else {
        return (
            <div className={styles.somethingWrong_container}>
                <BsFillExclamationOctagonFill />
                <h1>Oops!</h1>
                <p>Algo inesperado aconteceu</p>
                <Link to="/">Voltar para página inicial</Link>
            </div>
        );
    }
}

export default RootBoundary;