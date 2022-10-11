import express from 'express';

const router = express.Router();

const tasks = require('../data/tasks.json');

router.get('/getById/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const foundTask = tasks.find((task) => task.id === taskId);
  if (foundTask) {
    res.send({ success: true, data: foundTask });
  } else {
    res.status(404).send({ success: false, msg: 'Task not found' });
  }
});

export default router;
