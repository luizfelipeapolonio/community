// CSS
import styles from "./DefaultUser.module.css";

import { FaUser } from "react-icons/fa";

interface Props {
    position?: "center";
}

const DefaultUser = ({ position }: Props) => {
    return (
        <div className={`${styles.default_container} ${position ? styles[position] : null}`}>
            <FaUser />
        </div>
    );
}

export default DefaultUser;