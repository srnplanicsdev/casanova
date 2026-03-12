import AgentProfile from "../../model/agentModel.js";
import Property from "../../model/propertyModel.js";
import User from "../../model/userModel.js";
import cloudinary from "../../config/cloudinary.js";
import { notifyAdmins, notifySpecificUser } from "../../websocket/notify.js"; 
export const createProperty = async (req, res) => {
  try {
    const uploadedImages = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "properties",
        });
        console.log("multer file");
        uploadedImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    if (req.body.imageUrls) {
      const imageUrls = Array.isArray(req.body.imageUrls)
        ? req.body.imageUrls
        : [req.body.imageUrls];
      console.log("cloudinary file");
     
        await Promise.all(imageUrls.map(async (url) => {
        try {
          const result = await cloudinary.uploader.upload(url, {
            folder: "properties",
          });
          uploadedImages.push({
            url: result.secure_url,
            public_id: result.public_id,
          });
        } catch (uploadErr) {
          console.error("Cloudinary upload error for URL:", url, uploadErr);
        }
      }))
    }

    const { imageUrls, images, existingImages, ...rest } = req.body;
    const property = await Property.create({
      ...rest,
      images: uploadedImages,
      agent: req.user._id,  
      verificationStatus: "pending",
    });
    notifyAdmins(
        "property_created",
        "New Property Added",
        `${req.user.name} has listed a new property: ${property.title?.en || property.title}`
    );

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findOne({
      _id: req.params.id,
      agent: req.user._id,
    });

    if (!property) {
      return res
        .status(404)
        .json({ message: "Property not found or unauthorized" });
    }

    let updatedImages = [];

    if (req.body.existingImages) {
      const existingIds = Array.isArray(req.body.existingImages)
        ? req.body.existingImages
        : [req.body.existingImages];

      updatedImages = property.images.filter((img) =>
        existingIds.includes(img.public_id),
      );

      const removedImages = property.images.filter(
        (img) => !existingIds.includes(img.public_id),
      );

      for (const img of removedImages) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    } else if (property.images.length > 0) {
      for (const img of property.images) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "properties",
        });
        console.log("cloudinary file");
        updatedImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    if (req.body.imageUrls) {
      const imageUrls = Array.isArray(req.body.imageUrls)
        ? req.body.imageUrls
        : [req.body.imageUrls];

      for (const url of imageUrls) {
        try {
          const result = await cloudinary.uploader.upload(url, {
            folder: "properties",
          });
          updatedImages.push({
            url: result.secure_url,
            public_id: result.public_id,
          });
        } catch (uploadErr) {
          console.error("Cloudinary upload error for URL:", url, uploadErr);
        }
      }
    }

    const { imageUrls, images, existingImages, ...rest } = req.body;

    property.set({
      ...rest,
      images: updatedImages,
      verificationStatus: "pending",
    });

    await property.save();
    notifyAdmins(
        "property_updated",
        "Property Updated",
        `${req.user.name} updated the property: ${property.title?.en || property.title}`
    );
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({
      _id: req.params.id,
      agent: req.user._id,
    });
    if (!property)
      return res
        .status(404)
        .json({ message: "Property not found or unauthorized" });
    for (const img of property.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }
    notifyAdmins(
        "property_deleted",
        "Property Removed",
        `${req.user.name} deleted a property listing.`
    );
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getProperty = async (req, res) => {
  try {
    const property = await Property.findOne({
      _id: req.params.id,
    }).populate("agent", "name email");
    if (!property)
      return res
        .status(404)
        .json({ message: "Property not found or unauthorized" });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find({ agent: req.params.id });
    const agent = await AgentProfile.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    if (agent.isVerified) {
      res.status(200).json(properties);
    } else {
      res.status(403).json({ message: "Agent not verified" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      agent: req.user._id,
    }).populate("agent", "name email");
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAgentProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    const agentProfile = await AgentProfile.findOne({ user: req.user._id });
    res.status(200).json({ ...user?.toObject(), ...agentProfile?.toObject() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAgentProfile = async (req, res) => {
  try {
    const { password, role, ...rest } = req.body;

    const userFields = {};
    const profileFields = {};
    const agentOnlyFields = ["bio", "phone", "officeLocation", "contactEmail"];
    Object.entries(rest).forEach(([key, val]) => {
      if (agentOnlyFields.includes(key)) profileFields[key] = val;
      else userFields[key] = val;
    });
    await User.findByIdAndUpdate(req.user._id, userFields);
    const agentProfile = await AgentProfile.findOneAndUpdate(
      { user: req.user._id },
      profileFields,
      { new: true, upsert: true },
    );
    res.status(200).json(agentProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markSoldProperty = async (req, res) => {
  try {
    const property = await Property.findOne({
      _id: req.params.id,
      agent: req.user._id,
    });
    if (!property)
      return res
        .status(404)
        .json({ message: "Property not found or unauthorized" });
    property.isSold = true;
    await property.save();
    notifyAdmins(
        "property_sold",
        "Property Sold",
        `${req.user.name} sold a property ${property.title?.en || property.title}.`
    );
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}