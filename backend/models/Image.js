import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model('Image', imageSchema);
