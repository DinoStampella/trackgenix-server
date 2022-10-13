import express from 'express';
import fs from 'fs';

const timeSheets = require('../data/time-sheets.json');

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

router.put('/:id', (req, res) => {
  const updateTimesheets = req.body;
  const timesheetsId = req.params.id;
  const foundTimesheet = timeSheets.find((element) => element.id === timesheetsId);
  if (!foundTimesheet) {
    res.status(404).json({
      success: false,
      msg: 'There is no Timesheet with this id',
    });
    return;
  }
  if (updateTimesheets.startDate) {
    foundTimesheet.startDate = updateTimesheets.startDate;
  }
  if (updateTimesheets.endDate) {
    foundTimesheet.endDate = updateTimesheets.endDate;
  }
  if (updateTimesheets.taskName) {
    foundTimesheet.taskName = updateTimesheets.taskName;
  }
  if (updateTimesheets.description) {
    foundTimesheet.description = updateTimesheets.description;
  }
  if (updateTimesheets.projectName) {
    foundTimesheet.projectName = updateTimesheets.projectName;
  }

  fs.writeFile(
    './src/data/time-sheets.json',
    JSON.stringify(timeSheets, null, 2),
    (err) => {
      if (err) {
        res.status(400).json({
          response: 'Error',
          msg: 'Timesheet id not found',
        });
      } else {
        res.status(202).json({
          success: true,
          msg: 'Timesheet modified successfully',
          data: foundTimesheet,
        });
      }
    },
  );
});

router.delete('/', (req, res) => {
  const timesheetsId = req.params.id;
  const deleteTimesheet = timeSheets.find((element) => element.id === timesheetsId);
  if (!deleteTimesheet) {
    res.status(404).json({
      success: false,
      msg: 'There is no Timesheet with this id',
    });
    return;
  }

  timeSheets.splice(timeSheets.indexOf(deleteTimesheet), 1);

  fs.writeFile(
    './src/data/time-sheets.json',
    JSON.stringify(timeSheets, null, 2),
    (err) => {
      if (err) {
        res.status(400).json({
          success: false,
        });
      } else {
        res.status(200).json({
          success: true,
          msg: 'Timesheet delete successfully',
          data: timeSheets,
        });
      }
    },
  );
});

export default router;
