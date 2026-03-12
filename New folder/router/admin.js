import express from "express";
const router = express.Router();

import {
    getAllProperties,
    getPropertyById,
    updateProperty,
    deleteProperty,
    verifyProperty,
    rejectProperty,

    getAgents,
    getAgentById,
    updateAgent,
    deleteAgent,
    verifyAgent,
    rejectAgent,

    getTestimonials,
    getTestimonialById,
    updateTestimonial,
    deleteTestimonial,
    getUsers,

    getProfile,
    updateProfile,

} from "../controller/admin/adminController.js";


import roleMiddleware from "../middleware/roleMiddleware.js";
import protect from "../middleware/authMiddleware.js";



router.get("/properties", protect, roleMiddleware("admin"), getAllProperties);
router.get("/properties/:id", protect, roleMiddleware("admin"), getPropertyById);
router.put("/properties/:id", protect, roleMiddleware("admin"), updateProperty);
router.delete("/properties/:id", protect, roleMiddleware("admin"), deleteProperty);

router.patch("/properties/:id/verify", protect, roleMiddleware("admin"), verifyProperty);
router.patch("/properties/:id/reject", protect, roleMiddleware("admin"), rejectProperty);



router.get("/agents", protect, roleMiddleware("admin"), getAgents);
router.get("/agents/:id", protect, roleMiddleware("admin"), getAgentById);
router.put("/agents/:id", protect, roleMiddleware("admin"), updateAgent);
router.delete("/agents/:id", protect, roleMiddleware("admin"), deleteAgent);

router.patch("/agents/:id/verify", protect, roleMiddleware("admin"), verifyAgent);
router.patch("/agents/:id/reject", protect, roleMiddleware("admin"), rejectAgent);

router.get("/users", protect, roleMiddleware("admin"), getUsers);


router.get("/testimonials", protect, roleMiddleware("admin"), getTestimonials);
router.get("/testimonials/:id", protect, roleMiddleware("admin"), getTestimonialById);
router.put("/testimonials/:id", protect, roleMiddleware("admin"), updateTestimonial);
router.delete("/testimonials/:id", protect, roleMiddleware("admin"), deleteTestimonial);

router.get("/profile", protect, roleMiddleware("admin"), getProfile);
router.put("/profile", protect, roleMiddleware("admin"), updateProfile);

export default router;
