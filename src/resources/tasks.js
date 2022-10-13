import express from 'express';

const router = express.Router();

const tasks = require('../data/tasks.json');

router.get('/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const foundTask = tasks.find((task) => task.id === taskId);
  if (foundTask) {
    res.status(200).json({ success: true, msg: 'Task found successfully', data: foundTask });
  } else {
    res.status(404).json({ success: false, msg: 'There is no task with this id' });
  }
});

export default router;
