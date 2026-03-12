import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title: String,
  type: String,
  status: String,
  price: Number,
  currency: String,
  reference: String,
  energyRating: String,
  location: {
    country: String,
    area: String,
    areaId: mongoose.Schema.Types.ObjectId,
    city: String,
    zone: String,
    distanceToBeachMeters: Number
  },
 images: [
  {
    url: {
      type: String,
      required: true
    },
    public_id: {
      type: String,
      required: true
    }
  }
],
  propertyDetails: {
    bedrooms: Number,
    bathrooms: Number,
    floor: Number,
    usableArea: Number,
    plotSize: Number,
    balconyArea: Number,
    pool: String
  },
  construction: {
    year:Number,
    deliveryDate: String
  },
  description: String,
  communityFeatures: Array,
  architects: Array,
  
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  verificationStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  isSold: {
    type: Boolean,
    default: false,
  },

  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

},{strict:"throw",timestamps:true});
const Property = mongoose.model("Property", propertySchema);

export default Property;