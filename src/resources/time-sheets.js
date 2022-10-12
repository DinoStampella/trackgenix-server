import express from 'express';
import fs from 'fs';
import timeSheets from '../data/time-sheets.json';

const router = express.Router();

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
