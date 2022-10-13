import express from 'express';

import superAdminsRouter from './resources/super-admins';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.use('/super-admins', superAdminsRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
