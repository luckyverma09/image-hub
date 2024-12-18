import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { publicId } = req.body;

    try {
      const result = await cloudinary.uploader.destroy(publicId);
      res.status(200).json({ message: 'Image deleted successfully', result });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete image', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
