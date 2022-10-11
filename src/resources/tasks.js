import express from 'express';

const router = express.Router();

const tasks = require('../data/tasks.json');

router.get('/filter', (req, res) => {
  const { taskName } = req.query;
  const foundTask = tasks.filter((task) => task.taskName === taskName);
  if (foundTask) {
    res.send(foundTask);
  } else {
    res.status(404).send('{success: false,msg: "Task not found"}');
  }
});

export default router;
