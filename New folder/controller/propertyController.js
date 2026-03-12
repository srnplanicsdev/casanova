import Property from "../model/propertyModel.js";
import { notifySpecificUser, notifyAdmins } from "../websocket/notify.js";
import cloudinary from "../config/cloudinary.js";

export const getProperties = async (req, res) => {
    try {
        const properties = await Property.find({isSold:false,verificationStatus:"approved"}).populate("agent", "name email");
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate("agent", "name email");
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProperty = async (req, res) => {
    try {   
        const uploadedImages = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "properties",
                });
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

            for (const url of imageUrls) {
                try {
                    const result = await cloudinary.uploader.upload(url, {
                        folder: "properties",
                    });
                    uploadedImages.push({
                        url: result.secure_url,
                        public_id: result.public_id,
                    });
                } catch (err) {
                    console.error("Cloudinary URL upload failed:", url, err);
                }
            }
        }

        const { imageUrls, images, existingImages, ...rest } = req.body;
        const property = await Property.create({
            ...rest,
            images: uploadedImages,
            agent: req.user?._id || rest.agent,
            verificationStatus: "pending",
        });

        res.status(201).json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: "Property not found" });

        let updatedImages = [];

        // 1. Existing images
        if (req.body.existingImages) {
            const existingIds = Array.isArray(req.body.existingImages)
                ? req.body.existingImages
                : [req.body.existingImages];

            updatedImages = property.images.filter(img => existingIds.includes(img.public_id));

            // Delete removed images
            const removedImages = property.images.filter(img => !existingIds.includes(img.public_id));
            for (const img of removedImages) {
                await cloudinary.uploader.destroy(img.public_id);
            }
        } else if (property.images.length > 0) {
            for (const img of property.images) {
                await cloudinary.uploader.destroy(img.public_id);
            }
        }

        // 2. Uploaded files
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "properties",
                });
                updatedImages.push({
                    url: result.secure_url,
                    public_id: result.public_id,
                });
            }
        }

        // 3. URLs
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
                } catch (err) {
                    console.error("Cloudinary URL upload failed:", url, err);
                }
            }
        }

        const { imageUrls, images, existingImages, ...rest } = req.body;
        property.set({
            ...rest,
            images: updatedImages
        });

        await property.save();
        notifyAdmins(
            "property_updated",
            "Property Updated",
            `A property listing has been updated: ${property.title?.en || property.title}`
        );
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (property && property.images) {
            for (const img of property.images) {
                await cloudinary.uploader.destroy(img.public_id);
            }
        }
        await Property.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Property deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
