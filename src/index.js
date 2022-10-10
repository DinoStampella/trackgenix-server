// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
const projects = require('./resources/projects');
const tasks = require('./resources/tasks');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.use('/projects', projects);
app.use('/tasks', tasks);

app.listen(port, () => {
});
