import foodService from '../services/food.service.js';
import { statusCodes } from '../config/constants.js';

async function createFood(req, res) {
  try {
    res.send(await foodService.createFood(req.body, req.file, req.fileExtError));
  } catch (e) {
    res.status(e.httpStatus || statusCodes.badRequest).send(e.message || '');
  }
}

async function getFoodById(req, res) {
  try {
    res.send(await foodService.getFoodById(req.params.foodId));
  } catch (e) {
    res.status(e.httpStatus || statusCodes.badRequest).send(e.message || '');
  }
}

export default {
  createFood,
  getFoodById,
};
