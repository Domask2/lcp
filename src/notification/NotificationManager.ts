import { NotificationType} from "./types";

class NotificationManager {
    listNotify: NotificationType[];
    callback: (listNotify: NotificationType[]) => void;
    showCount: number;

    constructor() {
        this.listNotify = [];
        this.callback = () => {};
        this.showCount = 5;
    }

    async add(notify: NotificationType) {
        const findNotificationIndex = this.listNotify.findIndex(
            (el) => el.id === notify.id
        );
        if (findNotificationIndex !== -1) {
            return;
        }
        this.listNotify = [notify, ...this.listNotify]
        this.callback([...this.listNotify])
        if (notify.timeout !== 0) {
            setTimeout(() => {
                this.remove(notify.id);
            }, notify.timeout);
        }
    }

    remove(id: string) {
        this.listNotify = this.listNotify.filter((list) => id !== list.id)
        this.callback([...this.listNotify])
    }

    clearNotifyList() {
        this.listNotify = []
    }

    addChangeListener(callback: (listNotify: NotificationType[]) => void) {
        this.callback = callback
    }
}

export default new NotificationManager();