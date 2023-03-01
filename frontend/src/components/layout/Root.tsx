// CSS
import styles from "./Root.module.css";

// Components
import Navbar from "./Navbar";
import Footer from "./Footer";

import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <>
            <Navbar />
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default Root;