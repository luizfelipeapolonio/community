// CSS
import styles from "./Home.module.css";

// Components
import Loading from "../../components/Loading";
import PostCard from "../../components/PostCard";

// Types
import { IPost } from "../../types/shared.types";
import { AppDispatch, RootState } from "../../config/store";

import { Link } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Reducers
import { resetPostStates, getAllPosts } from "../../slices/postSlice";

const Home = () => {
    const [posts, setPosts] = useState<IPost[]>([]);

    const { payload: allPosts, loading } = useSelector((state: RootState) => state.post);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getAllPosts());
    }, []);

    useEffect(() => {
        if(allPosts) {
            if(allPosts.status === "success") {
                setPosts(allPosts.payload as IPost[]);
                dispatch(resetPostStates());
            }
        }
    }, [allPosts]);

    return (
        <div className={styles.home_container}>
            {loading && posts.length === 0 && <Loading />}
            {posts.length > 0 && (
                posts.map((post) => (
                    <PostCard post={post} key={post._id} />
                ))
            )}
            {posts.length === 0 && !loading && (
                <div className={styles.home_noposts}>
                    <p> Ainda não há nenhum post compartilhado.</p>
                    <p>Seja o primeiro!</p>
                    <Link to="/post">
                        Criar primeiro post
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Home;