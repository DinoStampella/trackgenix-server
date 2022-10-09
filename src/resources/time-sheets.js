const express = require('express');
const timeSheets = require('../data/time-sheets.json');

const router = express.Router();

router.get('/getById/:id', (req, res) => {
  const timeSheetId = req.params.id;
  const timeSheetObtained = timeSheets.find((timeSheet) => timeSheet.id === timeSheetId);
  if (timeSheetObtained) {
    res.send(timeSheetObtained);
  } else {
    res.send('Timesheet not found');
  }
});

module.exports = router;
