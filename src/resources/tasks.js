const express = require('express');
const fs = require('fs');
const tasksList = require('../data/tasks.json');

const router = express.Router();

router.delete('/delete/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const foundTasks = tasksList.find((tasks) => tasks.id === taskId);
  if (!foundTasks) {
    res.status(404).json({
      response: 'error',
      msg: 'task not found',
    });
    return;
  }
  const filteredTasks = tasksList.filter((tasks) => tasks.id !== taskId);
  fs.writeFile('src/data/tasks.json', JSON.stringify(filteredTasks), (err) => {
    if (err) {
      res.status(204).json({
        response: 'error',
        msg: 'can not write tasks file',
      });
    } else {
      res.status(200).json({
        response: 'ok',
        msg: '',
      });
    }
  });
});

module.exports = router;
