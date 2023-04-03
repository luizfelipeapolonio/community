// CSS
import styles from "./EditProfile.module.css";

// Components
import Image from "../../components/Image";
import DefaultUser from "../../components/layout/DefaultUser";
import Loading from "../../components/Loading";
import FlashMessage from "../../components/FlashMessage";

// Icons
import { 
    FaUser, 
    FaEnvelope, 
    FaLock, 
    FaEye, 
    FaEyeSlash, 
    FaAlignLeft,
    FaFileImage,
    FaTimes
} from "react-icons/fa";

// Types
import { AppDispatch, RootState } from "../../config/store";
import { IUser } from "../../types/shared.types";
import { IUpdateBody } from "../../types/user.types";

import { uploads } from "../../config/requestConfig";

import { extractFormMessages } from "../../utils/extractFormMessages";

// Hooks
import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";

// Reducers
import { getCurrentUser, updateProfile, resetUserStates } from "../../slices/userSlice";

const EditProfile = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<File | null>(null);
    const [bio, setBio] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
    const [isConfirmPassVisible, setIsConfimPassVisible] = useState<boolean>(false);

    const imageInputRef = useRef<HTMLInputElement>(null!);

    const dispatch = useDispatch<AppDispatch>();
    const { payload, loading } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(getCurrentUser());
    }, []);

    // Set up form states data and messages
    useEffect(() => {
        if(payload) {
            if(payload.status === "success" && typeof payload.message === "string") {
                if(payload.message.includes("logado")) {
                    const user = payload.payload as IUser;
    
                    setName(user.name);
                    setEmail(user.email);
                    setImage(user.profileImage || "");
                    setBio(user.bio || "");
                }
                
                if(payload.message.includes("atualizado")) {
                    setMessage(payload.message);
                    setError(false);
                }
            }

            if(payload.status === "error") {
                if(typeof payload.message === "string") {
                    setMessage(payload.message);
                } else {
                    const extractedMessages = extractFormMessages(payload);

                    if(extractedMessages) {
                        setMessage(extractedMessages[0]);
                    }
                }

                setError(true);
            }
        }
    }, [payload]);

    // Check if there is message, if so, scroll to top and clean up then
    useEffect(() => {
        if(message && !loading) {
            window.scrollTo({top: 0, behavior: "smooth"});
        }

        if(message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 3000);
            
            dispatch(resetUserStates());

            return () => clearTimeout(timer);
        }

    }, [message, loading]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const user: IUpdateBody = {
            name
        }

        if(bio) {
            user.bio = bio;
        }

        if(imagePreview) {
            user.profileImage = imagePreview;
        }

        if(password) {
            if(password === confirmPassword) {
                user.password = password;
            } else {
                setMessage("As senhas precisam ser iguais");
                setError(true);

                return;
            }
        }

        const formData = new FormData();

        Object.entries(user).forEach((value) => {
            formData.append(value[0], value[1]);
        });
        
        await dispatch(updateProfile(formData as IUpdateBody));
    }

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const image: File | null = e.target.files ? e.target.files[0] : null;

        if(image && !image.name.match(/\.(png|jpg)$/i)) {
            setError(true);
            setMessage("Por favor, envie apenas imagens png ou jpg!");
            clearImage();            
            return;
        }

        setImagePreview(image);
    }

    const clearImage = () => {
        setImagePreview(null);
        imageInputRef.current.value = "";
    }

    return (
        <>
            {loading ? <Loading /> : (
            <div className={styles.edit_container}>
                <h2>Editar Perfil</h2>
                {(image || imagePreview) ? (
                    <Image 
                        src={
                            imagePreview ? 
                            URL.createObjectURL(imagePreview) : 
                            `${uploads}/users/${image}`
                        }
                        alt={name} 
                    />
                ) : <DefaultUser position="center" />}
                {message && (
                    <FlashMessage 
                        type={error ? "error" : "success"} 
                        message={message} 
                    />
                )}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Nome</label>
                    <div className={styles.edit_user}>
                        <FaUser />
                        <input 
                            type="text"
                            name="name"
                            placeholder="Seu nome"
                            value={name || ""}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <label htmlFor="email">E-mail</label>
                        <div className={styles.edit_email}>
                            <FaEnvelope />
                            <input
                                type="email"
                                name="email"
                                placeholder="Seu e-mail"
                                value={email || ""}
                                readOnly
                            />
                        </div>
                    <label htmlFor="image">Imagem de perfil</label>
                    <div className={styles.edit_image}>
                        <FaFileImage />
                        <input type="file" name="image" ref={imageInputRef} onChange={handleFile} />
                        <button 
                            type="button"
                            onClick={clearImage}
                        >
                            <FaTimes />
                        </button>
                    </div>
                    <label htmlFor="bio">Bio</label>
                        <div className={styles.edit_bio}>
                            <FaAlignLeft />
                            <input 
                                type="text"
                                name="bio"
                                placeholder="Sua bio"
                                value={bio || ""}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </div>
                    <label htmlFor="password">Senha</label>
                        <div className={styles.edit_pass}>
                            <FaLock />
                            <input
                                type={isPassVisible ? "text" : "password"}
                                name="password"
                                placeholder="Nova senha"
                                value={password || ""}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setIsPassVisible((visibility) => !visibility)}
                            >
                                {isPassVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    <label htmlFor="confirmPassword">Confirmar Senha</label>
                        <div className={styles.edit_pass}>
                            <FaLock />
                            <input
                                type={isConfirmPassVisible ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirme a nova senha"
                                value={confirmPassword || ""}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setIsConfimPassVisible((visibility) => !visibility)}
                            >
                                {isConfirmPassVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                    {loading && <input type="submit" value="Aguarde..." disabled />}
                    {!loading && <input type="submit" value="Atualizar" />}
                </form>
            </div>
            )}
        </>
    );
}

export default EditProfile;