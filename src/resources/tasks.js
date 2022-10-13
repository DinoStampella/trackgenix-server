import express from 'express';

const router = express.Router();

const tasks = require('../data/tasks.json');

router.get('/:taskName', (req, res) => {
  const { taskName } = req.params;
  const foundTask = tasks.filter((task) => task.taskName === taskName);
  if (foundTask.length > 0) {
    res.json({ success: true, msg: 'Task found successfully', data: foundTask });
  } else {
    res.status(400).json({ success: false });
  }
});

export default router;
