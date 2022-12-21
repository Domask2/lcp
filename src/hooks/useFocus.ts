import {useRef} from "react";

export const useFocus = () => {
    const htmlRef = useRef(null);
    const setFocus = () => htmlRef.current && (htmlRef.current! as HTMLElement).focus();
    return [htmlRef, setFocus] as const
}