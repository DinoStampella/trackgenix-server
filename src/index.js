// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
const admins = require('./data/admins.json');

const app = express();
const port = process.env.PORT || 3000;
const timeSheetsRouter = require('./resources/time-sheets');

app.use(express.json());

app.use('/time-sheets', timeSheetsRouter);

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
