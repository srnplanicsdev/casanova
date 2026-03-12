import mongoose from "mongoose";

const testimonialsSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    rating: Number,
    image: String,
    slug: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Testimonials", testimonialsSchema);
