import express from 'express';
import mongoose from 'mongoose';

import router from './routes';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

const MONGO_URL = 'mongodb+srv://grupo-a:QWrYuBY4E4MCAo1q@cluster0.ww0uoal.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(
  MONGO_URL,
  (error) => {
    if (error) {
      console.log('Failed connection to database', error); // eslint-disable-line no-console
    } else {
      console.log('Connected to database'); // eslint-disable-line no-console
      app.listen(port, () => {
        console.log(`Server ready on port ${port}`); // eslint-disable-line no-console
      });
    }
  },
);
