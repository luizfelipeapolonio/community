// CSS
import styles from "./Form.module.css";

// Icons
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className={styles.form_container}>
            <h1>Entrar</h1>
            <p>
                Faça o login e compartilhe suas melhores experiências
            </p>
            <form>
                <div className={styles.email}>
                    <FaEnvelope />
                    <input type="email" placeholder="E-mail" />
                </div>
                <div className={styles.password}>
                    <FaLock />
                    <input type="password" placeholder="Senha" />
                    <button type="button"><FaEye /></button>
                </div>
                <input type="submit" value="Entrar" />
            </form>
            <p>
                Não tem uma conta? <Link to="/register">Registre-se</Link>
            </p>
        </div>
    );
}

export default Login;