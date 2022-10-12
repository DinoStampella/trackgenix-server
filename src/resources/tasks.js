const express = require('express');
const fs = require('fs');
const tasksList = require('../data/tasks.json');

const router = express.Router();

router.delete('/delete/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const foundTasks = tasksList.find((tasks) => tasks.id === taskId);
  if (!foundTasks) {
    res.status(404).json({
      succes: false,
      msg: 'There is not task with this id',
      data: '',
    });
    return;
  }

  const filteredTasks = tasksList.filter((tasks) => tasks.id !== taskId);
  fs.writeFile('src/data/tasks.json', JSON.stringify(filteredTasks, null, 2), (err) => {
    if (err) {
      res.status(400).json({
        succes: false,
        msg: 'Can not write tasks file',
      });
    } else {
      res.status(200).json({
        succes: true,
        msg: '',
      });
    }
  });
});

module.exports = router;
