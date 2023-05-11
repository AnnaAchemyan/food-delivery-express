import Food from '../models/Food.js';
import { messages, statusCodes } from '../config/constants.js';
import AppError from '../errors/error.handler.js';
import Order from '../models/Order.js';

async function createOrder(payload) {
  const food = await Food.findById(payload.food);
  if (!food) {
    throw new AppError(messages.foodNotFound, statusCodes.notFound);
  }
  if (food.quantity < 1) {
    throw new AppError(messages.notAvailableProduct, statusCodes.notFound);
  }
  if ((food.quantity - payload.quantity) < 0) {
    throw new AppError(`There are currently ${payload.quantity} products out of stock, you can order only ${food.quantity}`, statusCodes.conflict);
  }

  const order = new Order({
    food: food.id,
    quantity: payload.quantity,
    pricePerFood: food.price,
    totalPrice: (payload.quantity * food.price),
  });
  await order.save();

  food.quantity -= payload.quantity;
  await food.save();

  return order;
}

export default {
  createOrder,
};
