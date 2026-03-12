import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import url from 'url';

let wss;
let clients = new Map();

export const initWebSocket = (httpServer) => {
    wss = new WebSocketServer({ server: httpServer });

    wss.on("connection", (ws, req) => {
        try {
            const parameters = url.parse(req.url, true).query;
            const token = parameters.token;

            if (!token) {
                ws.close(1008, "Token missing");
                return;
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "default_secret");
            const role = decoded.role;
            const userId = decoded.id;

            if (!userId) {
                ws.close(1008, "User ID missing in token");
                return;
            }

            clients.set(userId.toString(), { ws, role });
            console.log(`WebSocket client connected: ${role} ${userId}`);

            ws.on("close", () => {
                clients.delete(userId.toString());
                console.log(`WebSocket client disconnected: ${role} ${userId}`);
            });

            ws.on("error", (err) => {
                console.error("WebSocket error:", err);
            });
        } catch (error) {
            console.error("WebSocket auth error:", error.message);
            ws.close(1008, "Auth failed");
        }
    });
};

export const getWSS =()=> wss
export const getClients =()=> clients