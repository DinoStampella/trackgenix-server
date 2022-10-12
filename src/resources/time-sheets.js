import express from 'express';
import timeSheets from '../data/time-sheets.json';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'Timesheet found successfully',
    data: timeSheets,
  });
});

export default router;
