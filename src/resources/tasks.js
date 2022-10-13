import express from 'express';
import fs from 'fs';

const tasks = require('../data/tasks.json');

const router = express.Router();

router.put('/', (req, res) => {
  const newTask = req.body;
  const taskExists = tasks.find((task) => task.id === newTask.id);
  const allTasks = tasks;
  allTasks.forEach((task, index) => {
    if (task.id === newTask.id) {
      allTasks[index] = newTask;
    }
  });
  if (!taskExists) {
    res.status(404).json({
      success: false,
      msg: `There is no task with this id (${newTask.id})`,
    });
    return;
  }
  if (!newTask.taskName) {
    res.status(400).json({
      success: false,
      msg: 'Task must have a name. ',
    });
    return;
  }
  fs.writeFile('./src/data/tasks.json', JSON.stringify(allTasks, null, 2), (err) => {
    if (err) {
      res.status(400).json({
        success: false,
      });
      return;
    }
    res.status(200).json({
      success: true,
      msg: `Task ${newTask.id} modified successfully`,
      data: newTask,
    });
  });
});

router.delete('/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const foundTasks = tasks.find((task) => task.id === taskId);
  if (!foundTasks) {
    res.status(404).json({
      succes: false,
      msg: 'There is not task with this id',
      data: '',
    });
    return;
  }
  const filteredTasks = tasks.filter((task) => task.id !== taskId);
  fs.writeFile('src/data/tasks.json', JSON.stringify(filteredTasks, null, 2), (err) => {
    if (err) {
      res.status(400).json({
        succes: false,
      });
    } else {
      res.status(200).json({
        succes: true,
        msg: '',
      });
    }
  });
});

export default router;
