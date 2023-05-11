import Food from '../models/Food.js';
import AppError from '../errors/error.handler.js';
import { messages, statusCodes } from '../config/constants.js';
import Category from '../models/Category.js';

async function createFood(payload, file, imgExtError) {
  if (imgExtError) {
    throw new AppError(messages.wrongImage, statusCodes.forbidden);
  }
  const category = await Category.findOne({ name: payload.category });
  if (!category) {
    throw new AppError(messages.categoryNotFound, statusCodes.notFound);
  }
  const food = new Food({
    name: payload.name,
    price: payload.price,
    quantity: payload.quantity,
    image: file?.path,
    category: category.id,
  });
  await food.save();

  await Category.updateOne({ id: category.id }, { $push: { foods: food.id } });

  return food;
}

async function getFoodById(foodId) {
  const food = await Food.findById(foodId);
  if (!food) {
    throw new AppError(messages.foodNotFound, statusCodes.notFound);
  }
  const imageName = food.image?.split('/')[2];
  food.image = food.image ? `${process.env.BACK_URL}/${imageName}` : '';
  return food;
}

export default {
  createFood,
  getFoodById,
};
