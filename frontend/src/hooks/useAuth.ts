import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../config/store";

export const useAuth = () => {
    const [auth, setAuth] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if(user) {
            setAuth(true);
        } else {
            setAuth(false);
        }

        setLoading(false);
    }, [user]);

    return { auth, loading };
}