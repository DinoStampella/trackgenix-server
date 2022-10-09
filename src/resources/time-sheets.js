const express = require('express');
const fs = require('fs');
const timeSheets = require('../data/time-sheets.json');

const router = express.Router();

router.post('/add', (req, res) => {
  const newTimesheet = req.body;
  let alreadyExist = false;
  timeSheets.forEach((timeSheet) => {
    if (timeSheet.id === newTimesheet.id) {
      alreadyExist = true;
    }
  });
  if (!alreadyExist) {
    timeSheets.push(newTimesheet);
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(timeSheets), (err) => {
      if (err) {
        res.send("Timesheet couldn't be saved");
      } else {
        res.send('Timesheet created');
      }
    });
  } else {
    res.send('Already exist a timesheet with that id');
  }
});

module.exports = router;
