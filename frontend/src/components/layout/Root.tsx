// CSS
import styles from "./Root.module.css";

// Components
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loading from "../Loading";

import { Outlet, ScrollRestoration } from "react-router-dom";

// Hooks
import { useAuth } from "../../hooks/useAuth";

const Root = () => {
    const { loading } = useAuth();

    return (
        <>
            {loading && <Loading type="full" />}
            <Navbar />
            <main className={styles.main}>
                <Outlet />
                <ScrollRestoration />
            </main>
            <Footer />
        </>
    );
}

export default Root;