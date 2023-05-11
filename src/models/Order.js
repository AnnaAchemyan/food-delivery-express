import { model, Schema } from 'mongoose';

const orderSchema = new Schema({
  food: { type: Schema.Types.ObjectId, ref: 'food' },
  quantity: {
    type: Number,
    default: 1,
  },
  pricePerFood: {
    type: Number,
  },
  totalPrice: {
    type: Number,
  },
});

export default model('order', orderSchema);
