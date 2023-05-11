import categoryService from '../services/category.service.js';
import { statusCodes } from '../config/constants.js';

async function createCategory(req, res) {
  try {
    res.send(await categoryService.createCategory(req.body));
  } catch (e) {
    res.status(e.httpStatus || statusCodes.badRequest).send(e.message || '');
  }
}

export default {
  createCategory,
};
