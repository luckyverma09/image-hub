//backedn/controllers/imageController.js
import Image from '../models/Image.js';
import cloudinary from '../config/cloudinary.js';

// Upload Image
export const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path); // Upload to Cloudinary
    const newImage = new Image({
      url: result.secure_url,
      public_id: result.public_id,
      user: req.user.id, // Make sure the image is associated with the logged-in user
    });

    await newImage.save();
    res.json(newImage); // Return the uploaded image
  } catch (err) {
    res.status(500).send('Error uploading image.');
  }
};

// Get All Images
export const getImages = async (req, res) => {
  try {
    const images = await Image.find({ user: req.user.id }); // Only get images uploaded by the logged-in user
    res.json(images);
  } catch (err) {
    res.status(500).send('Error fetching images.');
  }
};

// Delete Image
export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ msg: 'Image not found' });
    }

    if (image.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'User not authorized' });
    }

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(image.public_id);

    // Remove the image from the database
    await image.remove();
    res.json({ msg: 'Image deleted successfully' });
  } catch (err) {
    res.status(500).send('Error deleting image.');
  }
};
