const express = require('express');
const timeSheets = require('../data/time-sheets.json');

const router = express.Router();

router.get('/getById/:id', (req, res) => {
  const timeSheetId = req.params.id;
  const timeSheetObtained = timeSheets.find((timeSheet) => timeSheet.id === timeSheetId);
  if (timeSheetObtained) {
    res.status(200).json({
      success: true,
      msg: "Timesheet found successfully",
      data: timeSheetObtained
    })
  } else {
    res.status(404).json({
      success: false,
      msg: "Cannot found timesheet"
    })
  }
});

module.exports = router;
