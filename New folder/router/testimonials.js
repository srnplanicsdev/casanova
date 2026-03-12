import express from "express";
const router = express.Router();
import { createTestimonial, getTestimonials, getTestimonialBySlug, updateTestimonial, deleteTestimonial } from "../controller/testimonialController.js";
router.post("/", createTestimonial);
router.get("/", getTestimonials);
router.get("/:slug", getTestimonialBySlug);
router.put("/:id", updateTestimonial);
router.delete("/:id", deleteTestimonial);
export default router;