import dotenv from "dotenv";
dotenv.config();
import express from "express";
import propertyRouter from "./router/property.js";
import testimonialsRouter from "./router/testimonials.js";
import authRouter from "./router/auth.js";
import adminRouter from "./router/admin.js";
import agentsRouter from "./router/agents.js";
import locationRouter from "./router/location.js";
import cors from "cors";
import "./model/mongoose.js";
import { initWebSocket } from "./websocket/websocket.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3001", "http://localhost:3000", "http://localhost:5173"],
    credentials: true,
}));
 const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
initWebSocket(server)
app.use("/api/properties", propertyRouter);
app.use("/api/testimonials", testimonialsRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/agent", agentsRouter);
app.use("/api/locations", locationRouter);

export default app;