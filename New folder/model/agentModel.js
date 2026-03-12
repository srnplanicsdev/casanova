import mongoose from "mongoose";

const agentProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  contactEmail: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  officeLocation: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const AgentProfile = mongoose.model("AgentProfile", agentProfileSchema);
export default AgentProfile;