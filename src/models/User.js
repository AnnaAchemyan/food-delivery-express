import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  },
  isActive: {
    type: String,
  },
  resetHash: {
    type: String,
    required: false,
  },
  // watchHistory: [{ type: Schema.Types.ObjectId, ref: 'video' }],
  // likedVideos: [{ type: Schema.Types.ObjectId, ref: 'video' }],
  // image: { type: Schema.Types.ObjectId, ref: 'image' },
}, { timestamps: true });

export default model('user', userSchema);
