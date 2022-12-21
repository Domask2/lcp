import {useEffect} from "react";

/**
 * useKeyPress
 * @param {array} keys
 * @param {function} action
 * @param {array} dependencies
 */

export const useKeyPress = (keys: ['altLeft' | 'altRight', 'KeyS'], action?: () => void, dependencies?: Array<string | {} | number | undefined>) => {
    useEffect(() => {
        const onKeypress = (e: any) => {
            if ((e.altKey && keys[0] === 'altLeft') && (e.code === 'KeyS' && keys[1] === 'KeyS')) {
                action && action();
            }
        };
        document.addEventListener('keydown', onKeypress);
        return () => {
            document.removeEventListener('keydown', onKeypress);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies ? dependencies : [])
}