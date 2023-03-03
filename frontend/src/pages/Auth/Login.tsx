// CSS
import styles from "./Form.module.css";

// Icons
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import { useState, FormEvent } from "react";

import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const login = {
            email,
            password
        }

        console.log(login);
    }

    return (
        <div className={styles.form_container}>
            <h1>Entrar</h1>
            <p>
                Faça seu login e compartilhe suas melhores experiências
            </p>
            <form onSubmit={handleSubmit}>
                <div className={styles.email}>
                    <FaEnvelope />
                    <input 
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                    />
                </div>
                <div className={styles.password}>
                    <FaLock />
                    <input 
                        type={isPassVisible ? "text" : "password"}
                        name="password"
                        placeholder="Senha"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                        type="button" 
                        onClick={() => setIsPassVisible((visibility) => !visibility)}
                    >
                        {isPassVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                <input type="submit" value="Entrar" />
            </form>
            <p className={styles.redirect}>
                Não tem uma conta? <Link to="/register">Registre-se</Link>
            </p>
        </div>
    );
}

export default Login;