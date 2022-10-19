import express from 'express';
import mongoose from 'mongoose';

// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
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
      // eslint-disable-next-line no-console
      console.log('Failed connection to database', error);
    } else {
      // eslint-disable-next-line no-console
      console.log('Connected to database');
      app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Server ready on port ${port}`);
      });
    }
  },
);
