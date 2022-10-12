// use "import" to import libraries
import express from 'express';
import timeSheetsRouter from './resources/time-sheets';
import employeesRouter from './resources/employees';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/time-sheets', timeSheetsRouter);
app.use('/employees', employeesRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
