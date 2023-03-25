import { useEffect, Dispatch, SetStateAction, MutableRefObject } from "react";

export const usePlaceholderImage = (ref: MutableRefObject<HTMLElement>, setState: Dispatch<SetStateAction<boolean>>) => {
    useEffect(() => {
        const intersectionObserver = new IntersectionObserver((entries) => {
            if(entries.some((entry) => entry.isIntersecting)) {
                setState(true);
                console.log("ESTÁ VISÍVEL");
                intersectionObserver.unobserve(ref.current);
            }
        });

        intersectionObserver.observe(ref.current);

        return () => intersectionObserver.disconnect();
    }, []);
}