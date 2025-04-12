import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (filePath) => {
    try {
         const result = await cloudinary.uploader.upload(filePath);
        return {
            url: result.secure_url,
            public_id: result.public_id,
        }
    } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        throw error;
    }
};


export default uploadToCloudinary;
