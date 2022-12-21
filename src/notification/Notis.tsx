import React, {useEffect} from "react";
import {errorNotification, successNotification} from "./notification";

export const Notis = ({message}: any) => {
    useEffect(() => {
        if (message.status) {
            if (message.status === 200) {
                successNotification('topRight', '', message.message);
            } else if (message.status === 422) {
                errorNotification('topRight', '', message.message);
            } else if (message.status === 404) {
                errorNotification('topRight', '', message.message);
            }
        }
    }, [])

    return null;
}

export default Notis