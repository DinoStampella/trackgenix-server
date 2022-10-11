// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
const superAdmins = require('./data/super-admins.json');

const app = express();
const superAdminsRouter = require('./resources/super-admins');

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/superAdmins', (req, res) => {
  res.status(200).json({
    data: superAdmins,
  });
});

app.use('/superAdmins', superAdminsRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
