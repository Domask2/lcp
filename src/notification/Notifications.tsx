import {useEffect, useState} from 'react';
import NotifyList from "./NotifyList";
import Portal from "../components/portal/Portal";
import NotificationManager from "./NotificationManager";
import {NotificationType} from './types';
import './notifications.css';

function Notifications() {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);

    const handleStoreChange = (notify: NotificationType[]) => {
        setNotifications([...notify]);
    };

    let scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
    let minHeight = (scrollHeight - document.body.clientHeight) - 50

    useEffect(() => {
        NotificationManager.addChangeListener(handleStoreChange);
    }, []);

    return (
        <Portal>
            {notifications.map((notification) =>
                <div style={{bottom: `-${minHeight}px`}} key={notification.id}
                     className={`portals-notify portals-notify-${notification.type}`}>
                    <NotifyList type={notification.type} text={notification.text}/>
                </div>
            )}
        </Portal>
    );
}

export default Notifications;
