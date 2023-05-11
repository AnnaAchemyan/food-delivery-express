import { Schema, model } from 'mongoose';

const foodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  category: { type: Schema.Types.ObjectId, ref: 'category' },
});

export default model('food', foodSchema);
