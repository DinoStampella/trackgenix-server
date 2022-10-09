const express = require('express');
const fs = require('fs');
const tasksList = require('../data/tasks.json');

const router = express.Router();

module.exports = router;

router.delete('/delete/:id', (req, res) => {
  const tasksId = parseInt(req.params.id, 10);
  const foundTasks = tasksList.find((tasks) => tasks.id === tasksId);
  if (!foundTasks) {
    res.send('{ response: "error", msg: "task not found" }');
  } else {
    const filteredTasks = tasksList.filter((tasks) => tasks.id !== tasksId);
    fs.writeFile('src/data/tasks.json', JSON.stringify(filteredTasks), (err) => {
      if (err) {
        res.send('{ response: "error", msg: "can not write task file" }');
      } else {
        res.send('{ response: "ok", msg: "" }');
      }
    });
  }
});
