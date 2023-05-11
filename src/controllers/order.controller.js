import orderService from '../services/order.service.js';
import { statusCodes } from '../config/constants.js';

async function createOrder(req, res) {
  try {
    res.send(await orderService.createOrder(req.body));
  } catch (e) {
    res.status(e.httpStatus || statusCodes.badRequest).send({ message: e.message || '' });
  }
}

export default {
  createOrder,
};
