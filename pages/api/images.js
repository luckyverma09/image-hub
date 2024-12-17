import cloudinary from "../../lib/cloudinary";

export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const { resources } = await cloudinary.search
      .expression(`folder:${userId}`)
      .sort_by("public_id", "desc")
      .max_results(30)
      .execute();

    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
}
