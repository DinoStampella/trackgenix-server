import express from 'express';

import fs from 'fs';

const router = express.Router();

const tasks = require('../data/tasks.json');

router.post('/', (req, res) => {
  const task = req.body;
  const { taskName, description } = task;
  const ids = tasks.map((t) => t.id);
  const maxId = Math.max(...ids);
  const newTask = {
    id: maxId + 1,
    taskName,
    description,
  };

  if (!taskName && !description) {
    res.status(400).json({ success: false, msg: 'You must add name and description' });
  } else if (!taskName) {
    res.status(400).json({ success: false, msg: 'You must add a name' });
  } else {
    tasks.push(newTask);
  }

  fs.writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
    if (err) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({ success: true, msg: 'Task Created', data: newTask });
    }
  });
});

export default router;
