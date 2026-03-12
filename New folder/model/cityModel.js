import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    area: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Area",
        required: true
    }
}, { timestamps: true });


citySchema.index({ name: 1, area: 1 }, { unique: true });

const City = mongoose.model("City", citySchema);
export default City;
