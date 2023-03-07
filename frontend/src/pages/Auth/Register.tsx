// CSS
import styles from "./Form.module.css";

// Components
import FlashMessage from "../../components/FlashMessage";

// Icons
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";

import { useState, useEffect, useRef, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Utils
import { extractFormMessages } from "../../utils/extractFormMessages";

// Reducers types
import { AppDispatch, RootState } from "../../config/store";

import { reset, register } from "../../slices/authSlice";

const Register = () => {
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
    const [isConfirmPassVisible, setIsConfirmPassVisible] = useState<boolean>(false);

    const nameInputRef = useRef<HTMLInputElement>(null!);

    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, payload, success } = useSelector((state: RootState) => state.auth);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user = {
            email,
            name,
            password,
            confirmPassword
        }

        await dispatch(register(user));
    }

    // Reset all auth states
    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    // Clean all inputs after user is successfully created
    useEffect(() => {
        if(success) {
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            nameInputRef.current.focus();
        }
    }, [success]);

   // Extract form validation messages and set to message state
    useEffect(() => {
        if(payload) {
            if(typeof payload.message === "string") {
                setMessage(payload.message);
            } else {
                const extractedMessages = extractFormMessages(payload);
                
                if(extractedMessages) {
                    const isEnglishMessage : boolean = extractedMessages[0].includes("must be");
                    const portugueseMessage = "Insira um e-mail válido";

                    setMessage(isEnglishMessage ? portugueseMessage : extractedMessages[0]);
                    console.log("TESTANDO", extractedMessages);
                }
            }
        }
    }, [payload]);

    // Reset form messages
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage("");
        }, 3000);

        return () => clearTimeout(timer);
    }, [message]);

    return (
        <div className={styles.form_container}>
            <h1>Criar Conta</h1>
            <p>
                Crie uma conta e comece a compartilhar coisas do seu interesse agora mesmo
            </p>
            {message && (
                <FlashMessage 
                    type={error ? "error" : "success"}
                    message={message}
                />
            )}
            <form onSubmit={handleSubmit}>
            <div className={styles.user}>
                    <FaUser />
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Seu nome"
                        value={name}
                        ref={nameInputRef}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                    />
                </div>
                <div className={styles.email}>
                    <FaEnvelope />
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Seu E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className={styles.password}>
                    <FaLock />
                    <input 
                        type={isPassVisible ? "text" : "password"} 
                        name="password" 
                        placeholder="Senha"
                        value={password}
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
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button 
                        type="button"
                        onClick={() => setIsConfirmPassVisible((visibility) => !visibility)}
                    >
                        {isConfirmPassVisible ? <FaEyeSlash/> : <FaEye />}
                    </button>
                </div>
                {!loading && <input type="submit" value="Cadastrar" />}
                {loading && <input type="submit" value="Aguarde..." disabled />}
            </form>
            <p className={styles.redirect}>
                Já tem uma conta? <Link to="/login">Entre</Link>
            </p>
        </div>
    );
}

export default Register;