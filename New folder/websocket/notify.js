import Notification from "../model/notificationModel.js";
import { getWSS, getClients } from "./websocket.js";

const createNotification = (type, title, message) => ({
    id: Date.now().toString(),
    type,
    title,
    message,
    timestamp: new Date().toISOString(),
    read: false
});
const saveNotification = async (userId, type, title, message) => {
    const notification = await Notification.create({
        userId,
        type,
        title,
        message,
        read: false
    });
    return notification;
};
// export const notifyAdmins = (type, title, message) => {
//     const clients = getClients();
//     const notification = JSON.stringify(createNotification(type, title, message));
//     clients.forEach((client) => {
//         saveNotification(client.userId, type, title, message);
//         if (client.role === "admin" && client.ws.readyState === 1) { // 1 is OPEN
//             client.ws.send(notification);
//         }
//     });
// };

// export const notifyAgent = (type, title, message) => {
//     const clients = getClients();
//     const notification = JSON.stringify(createNotification(type, title, message));
//     clients.forEach((client) => {
//         saveNotification(client.userId, type, title, message);
//         if (client.role === "agent" && client.ws.readyState === 1) {
//             client.ws.send(notification);
//         }
//     });
// };

export const notifyAdmins = async (type, title, message) => {
    const clients = getClients();

    for (const [userId, client] of clients) {
        if (client.role === "admin") {

            const notification = await saveNotification(userId, type, title, message);

            if (client.ws?.readyState === 1) {
                client.ws.send(JSON.stringify(notification));
            }
        }
    }
};

export const notifyAgent = async (type, title, message) => {
    const clients = getClients();

    for (const [userId, client] of clients) {
        if (client.role === "agent") {
            console.log("agent notification");
            const notification = await saveNotification(userId, type, title, message);

            if (client.ws?.readyState === 1) {
                client.ws.send(JSON.stringify(notification));
            }
        }
    }
};

notifyAdmins("system", "Server Update", "Server restarted");
export const notifySpecificUser = (userId, type, title, message) => {
    const clients = getClients();
    const client = clients.get(userId.toString());
    if (client && client.ws && client.ws.readyState === 1) {
        const notification = JSON.stringify(createNotification(type, title, message));
        client.ws.send(notification);
    }
};