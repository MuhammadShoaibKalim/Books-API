import express from 'express';
import { authenticateUser, isAdmin,  } from '../middlewares/auth.middleware.js';
import uploadMiddleware from '../middlewares/upload.middleware.js';
import {fetchingImage, uploadImage} from '../controllers/image.contoller.js';
const router = express.Router();

// Route to upload an image
router.post('/upload', authenticateUser, isAdmin, uploadMiddleware, uploadImage );
router.get("/get", authenticateUser, isAdmin, fetchingImage);


export default router;
