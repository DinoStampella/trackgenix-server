import express from 'express';
import {
  getAllTimesheets, getTimesheetById, createTimesheet, updateTimesheets, deleteTimesheet,
} from '../controllers/timesheets';
import validateTimesheet from '../validations/timesheets';

const router = express.Router();

router
  .get('/', getAllTimesheets)
  .get('/:id', getTimesheetById)
  .post('/', validateTimesheet, createTimesheet)
  .put('/:id', validateTimesheet, updateTimesheets)
  .delete('/:id', deleteTimesheet);

export default router;
