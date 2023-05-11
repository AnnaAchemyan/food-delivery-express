import Category from '../models/Category.js';
import { messages, statusCodes } from '../config/constants.js';
import AppError from '../errors/error.handler.js';

async function createCategory(payload) {
  const category = await Category.findOne({ name: payload.name });
  if (category) {
    throw new AppError(messages.categoryAlreadyUsed, statusCodes.conflict);
  }
  const newCategory = new Category({ ...payload });
  await newCategory.save();
  return newCategory;
}

export default {
  createCategory,
};
