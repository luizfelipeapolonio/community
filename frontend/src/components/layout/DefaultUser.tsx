// CSS
import styles from "./DefaultUser.module.css";

import { FaUser } from "react-icons/fa";

interface Props {
    size?: string;
    fontSize?: string;
    position?: "center";
}

const DefaultUser = ({ size, fontSize, position }: Props) => {
    return (
        <div 
            className={`${styles.default_container} ${position ? styles[position] : null}`}
            style={{
                width: size,
                height: size
            }}
        >
            <FaUser style={{ fontSize }} />
        </div>
    );
}

export default DefaultUser;