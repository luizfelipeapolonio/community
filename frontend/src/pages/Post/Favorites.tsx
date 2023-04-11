// CSS
import styles from "./Favorites.module.css";

// Components
import PostCard from "../../components/PostCard";
import Loading from "../../components/Loading";

// Types
import { AppDispatch, RootState } from "../../config/store";
import { IPost } from "../../types/shared.types";

// Hooks
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Reducers
import { resetPostStates, getFavoritePosts } from "../../slices/postSlice";

const Favorites = () => {
    const [favoritePosts, setFavoritePosts] = useState<IPost[]>([]);

    const dispatch = useDispatch<AppDispatch>();
    const { payload, loading } = useSelector((state: RootState) => state.post);

    useEffect(() => {
        dispatch(getFavoritePosts());
    }, []);

    useEffect(() => {
        if(payload) {
            if(payload.status === "success") {
                setFavoritePosts(payload.payload as IPost[]);
                dispatch(resetPostStates());
            }
        }
    }, [payload]);

    return (
        <div className={styles.favorites_container}>
            <h1>Aqui estão seus posts favoritos:</h1>
            {loading && favoritePosts.length === 0 && <Loading />}
            {favoritePosts.length > 0 && (
                favoritePosts.map((post) => (
                    <PostCard post={post} key={post._id} />
                ))
            )}
            {favoritePosts.length === 0 && !loading && (
                 <p style={{ 
                    fontSize: "2.2rem", 
                    margin: "auto", 
                    textAlign: "center"
                }}>
                    Você ainda não marcou nenhum post como favorito
                </p>
            )}
        </div>
    );
}

export default Favorites;