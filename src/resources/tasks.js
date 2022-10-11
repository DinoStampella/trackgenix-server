import express from 'express';

const router = express.Router();

const tasks = require('../data/tasks.json');

router.get('/getById/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const foundTask = tasks.find((task) => task.id === taskId);
  if (foundTask) {
    res.status(200).send({ success: true, msg: 'Task found successfully', data: foundTask });
  } else {
    res.status(404).send({ success: false, msg: 'There is no task with this id' });
  }
});

export default router;
