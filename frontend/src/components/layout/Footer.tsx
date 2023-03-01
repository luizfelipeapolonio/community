// CSS
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>Compartilhe os assuntos que você acha interessante</p>
            <p><span>Community</span> &copy; 2023</p>
        </footer>
    );
}

export default Footer;