import express from 'express';

import employeesRouter from './resources/employees';

const app = express();

const router = express.Router();
router.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use('/employees', employeesRouter);

const admins = require('./data/admins.json');

const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
