import express from 'express';
import { uploadImage, getImages, deleteImage } from '../controllers/imageController.js';
import protect from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/upload', protect, upload.single('image'), uploadImage);
router.get('/', protect, getImages);
router.delete('/:id', protect, deleteImage);

export default router;
