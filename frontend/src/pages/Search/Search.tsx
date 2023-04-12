// CSS
import styles from "./Search.module.css";

// Components
import PostCard from "../../components/PostCard";
import Loading from "../../components/Loading";

// Types
import { AppDispatch, RootState } from "../../config/store";
import { IPost } from "../../types/shared.types";

// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

// Reducers
import { resetPostStates, searchPost } from "../../slices/postSlice";

const Search = () => {
    const [searchParams] = useSearchParams();
    const query: string | null = searchParams.get("q");

    const [posts, setPosts] = useState<IPost[]>([]);

    const dispatch = useDispatch<AppDispatch>();
    const { payload, loading } = useSelector((state: RootState) => state.post);

    useEffect(() => {
        if(!query) return;
        setPosts([]);
        dispatch(searchPost(query.trim().replace(" ", "-")));
    }, [query]);

    useEffect(() => {
        if(payload) {
            if(payload.status === "success") {
                setPosts(payload.payload as IPost[]);
                dispatch(resetPostStates());
            }
        }
    }, [payload]);

    return (
        <div className={styles.search_container}>
            <h1>Resultados para: <span>{query}</span></h1>
            {posts.length === 0 && loading && <Loading />}
            {posts.length > 0 && (
                posts.map((post) => (
                    <PostCard post={post} key={post._id} />
                ))
            )}
            {posts.length === 0 && !loading && (
                <p style={{
                    fontSize: "2.2rem", 
                    margin: "auto", 
                    textAlign: "center"
                }}>
                    Nenhum post encontrado
                </p>
            )}
        </div>
    );
}

export default Search;