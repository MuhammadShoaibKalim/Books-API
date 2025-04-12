
import image from "../models/image.model.js";
import uploadToCloudinary from "../utils/cloudinary.util.js";

export const uploadImage = async (req, res) => {
    try {

        //Check if the file is missing in the request object. 
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        //upload to cloudinary
        const {url, public_id} = await uploadToCloudinary(req.file.path);

        //store the image url and public id 
        const newImage = new image({
            url,
            public_id,
            uploadedBy: req.user.id
        });
        await newImage.save();

        //send the response
        return res.status(201).json({
            message: 'Image uploaded successfully',
            image: {
                url: newImage.url,
                public_id: newImage.public_id,
                uploadedBy: newImage.uploadedBy
            },
        });
        
    } catch (error) {
        console.error('Error uploading image:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const fetchingImage = async (req, res) =>{
    try {
        const images = await image.find({}).populate();

        return res.status(200).json({
            message: 'Images fetched successfully',
            images,
        });
    }
    catch (error) {
        console.error('Error fetching images:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
