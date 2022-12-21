import {NotificationPlacement} from 'antd/es/notification';
import {notification} from 'antd';

const descObject = (desc: any) => {
    let desc1: any;
    if (typeof desc !== 'string') {
        let arr: any = [];
        Object.keys(desc).forEach((val: any) => {
            arr.push(`${val.toString()}: ${desc[val].toString()}\n`);
        })
        desc1 = arr.join()
    } else {
        desc1 = desc
    }

    return desc1
}

export const successNotification = (placement: NotificationPlacement, message: string, desc: string) => {
    notification.success({
        duration: 2,
        message: message,
        description: desc,
        placement,
    });
};

export const errorNotification = (placement: NotificationPlacement, message: string, desc: any) => {
    notification.error({
        duration: 2,
        message: message,
        description: descObject(desc),
        placement,
    });
};
