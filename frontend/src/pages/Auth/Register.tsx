// CSS
import styles from "./Form.module.css";

// Icons
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";

import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
    const [isConfirmPassVisible, setIsConfirmPassVisible] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const register = {
            email,
            name,
            password,
            confirmPassword
        }

        console.log(register);
    }

    return (
        <div className={styles.form_container}>
            <h1>Criar Conta</h1>
            <p>
                Crie uma conta e comece a compartilhar coisas do seu interesse agora mesmo
            </p>
            <form onSubmit={handleSubmit}>
                <div className={styles.email}>
                    <FaEnvelope />
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Seu E-mail" 
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus 
                    />
                </div>
                <div className={styles.user}>
                    <FaUser />
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Seu nome"
                        onChange={(e) => setName(e.target.value)}
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
                        {isPassVisible ? <FaEyeSlash/> : <FaEye />}
                    </button>
                </div>
                <div className={styles.password}>
                    <FaLock />
                    <input 
                        type={isConfirmPassVisible ? "text" : "password"} 
                        name="confirmPassword" 
                        placeholder="Confirmar senha"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button 
                        type="button"
                        onClick={() => setIsConfirmPassVisible((visibility) => !visibility)}
                    >
                        {isConfirmPassVisible ? <FaEyeSlash/> : <FaEye />}
                    </button>
                </div>
                <input type="submit" value="Cadastrar" />
            </form>
            <p className={styles.redirect}>
                Já tem uma conta? <Link to="/login">Entre</Link>
            </p>
        </div>
    );
}

export default Register;