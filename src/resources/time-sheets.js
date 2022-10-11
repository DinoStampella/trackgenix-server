const express = require('express');
const timeSheets = require('../data/time-sheets.json');

const router = express.Router();

router.get('/get', (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'Timesheet found successfully',
    data: timeSheets,
  });
});

module.exports = router;
