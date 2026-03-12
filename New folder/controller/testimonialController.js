import Testimonial from "../model/testimonialsModel.js";

export const createTestimonial = async (req, res) => {
    try {
        const { name, message, rating, image } = req.body;
        const slug = name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "");
        const testimonial = await Testimonial.create({ name, message, rating, image, slug });
        res.status(201).json(testimonial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTestimonialBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const testimonial = await Testimonial.findOne({ slug });
        if (!testimonial) {
            return res.status(404).json({ message: "Testimonial not found" });
        }
        res.status(200).json(testimonial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const updateTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(testimonial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
        res.status(200).json(testimonial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
