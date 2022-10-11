const express = require('express');
const fs = require('fs');
const timeSheets = require('../data/time-sheets.json');

const router = express.Router();

router.post('/add', (req, res) => {
  const newTimesheet = req.body;
  newTimesheet.id = (timeSheets.length + 1).toString();
  timeSheets.push(newTimesheet);
  fs.writeFile('src/data/time-sheets.json', JSON.stringify(timeSheets), (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
      });
    }
    return res.status(201).json({
      success: true,
      msg: 'Timesheet created successfully',
      data: newTimesheet,
    });
  });
});

module.exports = router;
