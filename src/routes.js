import authRouter from './routers/auth.router.js';
import userRouter from './routers/user.router.js';
import foodRouter from './routers/food.router.js';
import categoryRouter from './routers/category.router.js';
import orderRouter from './routers/order.router.js';

const routes = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/users', userRouter);
  app.use('/api/food', foodRouter);
  app.use('/api/category', categoryRouter);
  app.use('/api/order', orderRouter);
};

export default routes;
