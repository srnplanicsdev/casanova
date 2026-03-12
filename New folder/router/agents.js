import express from "express";
import { getMyProperties, getProperty, createProperty, updateProperty, deleteProperty, getAgentProfile, updateAgentProfile, markSoldProperty } from "../controller/agent/agentController.js";
import protect from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import verificationMiddleware from "../middleware/verificationMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
const router = express.Router();

router.get("/properties", protect, verificationMiddleware, roleMiddleware("agent"), getMyProperties);
router.get("/properties/:id", getProperty);
router.post("/properties", protect, upload.array("images", 20), verificationMiddleware, roleMiddleware("agent"), createProperty);
router.put("/properties/:id", protect, verificationMiddleware, roleMiddleware("agent"), updateProperty);
router.delete("/properties/:id", protect, verificationMiddleware, roleMiddleware("agent"), deleteProperty);
router.get("/profile", protect, roleMiddleware("agent"), getAgentProfile);
router.put("/profile", protect, roleMiddleware("agent"), updateAgentProfile);
router.patch("/properties/:id/sold", protect, verificationMiddleware, roleMiddleware("agent"), markSoldProperty);

export default router;