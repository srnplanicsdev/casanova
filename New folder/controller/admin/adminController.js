import Property from "../../model/propertyModel.js";
import AgentProfile from "../../model/agentModel.js";
import Testimonials from "../../model/testimonialsModel.js";
import dotenv from "dotenv";
import User from "../../model/userModel.js";
import { notifySpecificUser, notifyAgent, notifyAdmins } from "../../websocket/notify.js";
dotenv.config();

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { password, role, ...rest } = req.body; 
        const user = await User.findByIdAndUpdate(req.user._id, rest, { new: true }).select('-password');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find().sort({ createdAt: -1 }).populate("agent", "name email");
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate("agent", "name email");
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const updateProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!property) return res.status(404).json({ message: "Property not found" });
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const verifyProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await Property.findById(id);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        property.verificationStatus = "approved";
        await property.save();
        notifySpecificUser(
            property.agent,
            "property_approved",
            "Property Approved",
            `Your property "${property.title?.en || property.title}" has been approved.`
        );
        res.status(200).json({ message: "Property verified successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const rejectProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await Property.findById(id);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        property.verificationStatus = "rejected";
        await property.save();
        notifySpecificUser(
            property.agent,
            "property_rejected",
            "Property Rejected",
            `Your property "${property.title?.en || property.title}" has been rejected. Please review.`
        );
        res.status(200).json({ message: "Property rejected successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAgents = async (req, res) => {
    try {
        const agents = await AgentProfile.find();
        res.status(200).json(agents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "agent" });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAgentById = async (req, res) => {
    try {
        const agent = await AgentProfile.findById(req.params.id);
        res.status(200).json(agent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const updateAgent = async (req, res) => {
    try {
        const agent = await AgentProfile.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(agent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const deleteAgent = async (req, res) => {
    try {
        const agent = await AgentProfile.findByIdAndDelete(req.params.id);
        res.status(200).json(agent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const verifyAgent = async (req, res) => {
    try {
        const { id } = req.params;
        const agent = await User.findById(id);
        const agentId = await AgentProfile.findOne({user: id});
        if (!agent) {
            return res.status(404).json({ message: "Agent not found" });
        }
        agent.isVerified = true;
        agentId.isVerified = true;
        await agent.save();
        await agentId.save();

        if (agent.user) {
            await User.findByIdAndUpdate(agent.user, { isVerified: true });
        }
        notifySpecificUser(
            id,
            "account_verified",
            "Account Verified",
            "Congratulations! Your agent profile has been verified."
        );
        res.status(200).json({ message: "Agent verified successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const rejectAgent = async (req, res) => {
    try {
        const { id } = req.params;
        const agent = await User.findById(id);
        if (!agent) {
            return res.status(404).json({ message: "Agent not found" });
        }
        agent.isVerified = false;
        await agent.save();

        if (agent.user) {
            await User.findByIdAndUpdate(agent.user, { isVerified: false });
        }
        notifySpecificUser(
            id,
            "account_rejected",
            "Account Rejected",
            "Your agent profile verification was rejected."
        );
        res.status(200).json({ message: "Agent rejected successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonials.find();
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTestimonialById = async (req, res) => {
    try {
        const testimonial = await Testimonials.findById(req.params.id);
        res.status(200).json(testimonial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonials.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(testimonial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonials.findByIdAndDelete(req.params.id);
        res.status(200).json(testimonial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

