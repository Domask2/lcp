import {useEffect, useRef, useState} from "react";

export const useElementHeight = () => {

    const ref: any = useRef();
    const [height, setHeight] = useState<null | number>(null);

    const observer = useRef(
        new ResizeObserver((entries) => {
            const { height } = entries[0].contentRect;
            setHeight(height);
        })
    );

    useEffect(() => {
            observer.current.observe(ref.current);
        },
        [ref]);

    return [ref, height];
}