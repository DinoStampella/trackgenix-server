import express from 'express';
import fs from 'fs';
import timeSheets from '../data/time-sheets.json';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'Timesheet found successfully',
    data: timeSheets,
  });
});

router.get('/:id', (req, res) => {
  const timeSheetId = req.params.id;
  const timeSheetObtained = timeSheets.find((timeSheet) => timeSheet.id === timeSheetId);
  if (timeSheetObtained) {
    res.status(200).json({
      success: true,
      msg: 'Timesheet found successfully',
      data: timeSheetObtained,
    });
  } else {
    res.status(404).json({
      success: false,
      msg: 'Cannot found timesheet',
    });
  }
});

router.post('/', (req, res) => {
  const newTimesheet = req.body;
  newTimesheet.id = (timeSheets.length + 1).toString();
  timeSheets.push(newTimesheet);
  fs.writeFile('src/data/time-sheets.json', JSON.stringify(timeSheets, null, 2), (err) => {
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

export default router;
