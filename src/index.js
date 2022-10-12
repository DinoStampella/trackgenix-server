// use "import" to import libraries
import express from 'express';
import projects from './resources/projects';
import tasks from './resources/tasks';
import timeSheetsRouter from './resources/time-sheets';
import employeesRouter from './resources/employees';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.use('/projects', projects);
app.use('/tasks', tasks);
app.use('/time-sheets', timeSheetsRouter);
app.use('/employees', employeesRouter);

app.listen(port, () => {
});
