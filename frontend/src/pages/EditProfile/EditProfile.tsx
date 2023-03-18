// CSS
import styles from "./EditProfile.module.css";

// Components
import Image from "../../components/Image";

// Icons
import { 
    FaUser, 
    FaEnvelope, 
    FaLock, 
    FaEye, 
    FaEyeSlash, 
    FaAlignLeft,
    FaFileImage
} from "react-icons/fa";

// Types
import { AppDispatch, RootState } from "../../config/store";
import { IUser } from "../../types/shared.types";

import { uploads } from "../../config/requestConfig";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Reducers
import { getCurrentUser, updateProfile } from "../../slices/userSlice";

const EditProfile = () => {
    // const [user, setUser] = useState<IUser | null>(null);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
    const [isConfirmPassVisible, setIsConfimPassVisible] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();
    const { payload } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(getCurrentUser());
    }, []);

    useEffect(() => {
        if(payload) {
            if(payload.status === "success") {
                // setUser(payload.payload as IUser);
                const user = payload.payload as IUser;

                setName(user.name);
                setEmail(user.email);
                setImage(user.profileImage || "");
                setBio(user.bio || "");
            }
        }
    }, [payload]);

    // console.log("EDIT PROFILE: ", user);

    return (
        <div className={styles.edit_container}>
            <h2>Editar Perfil</h2>
            {image && <Image src={`${uploads}/users/${image}`} alt={name} />}
            <form>
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
                    <input type="file" name="image" />
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

                <input type="submit" value="Atualizar" />
            </form>
        </div>
    );
}

export default EditProfile;