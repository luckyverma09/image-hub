//pages/api/images.js
import cloudinary from '../../lib/cloudinary';

export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    console.error('User ID is missing in the request');
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    console.log(`Fetching images for user: ${userId}`);
    const { resources } = await cloudinary.search
      .expression(`folder:${userId}`)
      .sort_by('public_id', 'desc')
      .max_results(30)
      .execute();

    console.log(`Found ${resources.length} images for user ${userId}`);
    res.status(200).json(resources);
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    res.status(500).json({ error: 'Failed to fetch images', details: error.message });
  }
}
