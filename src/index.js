// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
import adminsRouter from './resources/admins';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.use('/admins', adminsRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
