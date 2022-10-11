import express from 'express';

const router = express.Router();

const tasks = require('../data/tasks.json');

router.get('/filter', (req, res) => {
  const { taskName } = req.query;
  const foundTask = tasks.filter((task) => task.taskName === taskName);
  if (foundTask.length > 0) {
    res.send({ success: true, msg: 'Task found successfully', data: foundTask });
  } else {
    res.status(400).send({ success: false });
  }
});

export default router;
