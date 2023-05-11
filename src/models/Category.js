import { model, Schema } from 'mongoose';

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  foods: [{ type: Schema.Types.ObjectId, ref: 'food' }],
});

export default model('category', categorySchema);
