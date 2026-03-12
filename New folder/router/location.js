import express from "express";
import { getAreas, getCitiesByArea, createArea, createCity } from "../controller/locationController.js";
import protect from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/areas", getAreas);
router.get("/areas/:areaId/cities", getCitiesByArea);


router.post("/areas", protect, roleMiddleware("admin"), createArea);
router.post("/cities", protect, roleMiddleware("admin"), createCity);

export default router;
