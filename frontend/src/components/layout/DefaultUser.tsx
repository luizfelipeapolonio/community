// CSS
import styles from "./DefaultUser.module.css";

import { FaUser } from "react-icons/fa";

const DefaultUser = () => {
    return (
        <div className={styles.default_container}>
            <FaUser />
        </div>
    );
}

export default DefaultUser;