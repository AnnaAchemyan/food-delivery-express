import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import route from './routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/uploads'));
const dbURL = process.env.MONGODB_URL;
const dbOptions = { useNewUrlParser: true };

route(app);

(async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(dbURL, dbOptions);
    app.listen(process.env.PORT || 3008, () => {
      console.log(`app started listen at ${process.env.PORT || 3008} PORT`);
    });
  } catch (err) {
    console.log(`error: ${err}`);
  }
})();
