import multer from 'multer';
import path from "path";


// Set multer storage 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// File filter function to check file type
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true); 
    }
    else {
        cb(new Error('Invalid file type. Only images are allowed.'),false )
    }
};

// Initialize upload middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
});

export default upload.single('image'); 
