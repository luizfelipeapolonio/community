// CSS
import styles from "./Form.module.css";

// Components
import FlashMessage from "../../components/FlashMessage";

// Icons
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

// Hooks
import { useState, useEffect, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

// Utils
import { extractFormMessages } from "../../utils/extractFormMessages";

// Reducer types
import { AppDispatch, RootState } from "../../config/store";

import { reset, login } from "../../slices/authSlice";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const dispatch = useDispatch<AppDispatch>();
    const { payload, loading } = useSelector((state: RootState) => state.auth);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user = {
            email,
            password
        }

        await dispatch(login(user));
    }

    // Extract form validation messages and set to message state
    useEffect(() => {
        if(payload) {
            if(typeof payload.message === "string") {
                if(payload.status === "error") {
                    setMessage(payload.message);
                }
            } else {
                const extractedMessages = extractFormMessages(payload);
                
                if(extractedMessages) {
                    const isEnglishMessage: boolean = extractedMessages[0].includes("must be");
                    const portugueseMessage = "Insira um e-mail válido";

                    setMessage(isEnglishMessage ? portugueseMessage : extractedMessages[0]);
                    console.log("LOGIN MESSAGES: ", extractedMessages);
                }
            }
            dispatch(reset());
        }
    }, [payload]);

    // Reset form messages
    useEffect(() => {
        if(message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 3000);

            return () => clearInterval(timer);
        }
    }, [message]);

    return (
        <div className={styles.form_container}>
            <h1>Entrar</h1>
            <p>
                Faça seu login e compartilhe suas melhores experiências
            </p>
            {message && <FlashMessage type="error" message={message} />}
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
                {!loading && <input type="submit" value="Entrar" />}
                {loading && <input type="submit" value="Aguarde..." disabled />}
            </form>
            <p className={styles.redirect}>
                Não tem uma conta? <Link to="/register">Registre-se</Link>
            </p>
        </div>
    );
}

export default Login;