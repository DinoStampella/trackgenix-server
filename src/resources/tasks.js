import express from 'express';

const fs = require('fs');

const router = express.Router();

const tasks = require('../data/tasks.json');

router.post('/add', (req, res) => {
  const task = req.body;
  const { taskName } = task;
  const taskDescription = task.description;
  const ids = tasks.map((t) => t.id);
  const maxId = Math.max(...ids);
  const newTask = {
    id: maxId + 1,
    taskName,
    description: taskDescription,
  };

  if (!taskName && !taskDescription) {
    res.status(400).send('{success: false,msg: "You must add name and description"}');
  } else if (!taskName) {
    res.status(400).send('{success: false,msg: "You must add a name"}');
  } else if (!taskDescription) {
    res.status(400).send('{success: false,msg: "You must add a description"}');
  } else {
    tasks.push(newTask);
  }

  fs.writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
    if (err) {
      res.status(500).send('Cannot save new task');
    } else {
      res.status(201).send('{success: true,msg: "Task Created",data: tasks}');
    }
  });
});

export default router;
