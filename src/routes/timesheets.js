import express from 'express';
import timesheetsControllers from '../controllers/timesheets';
import timesheetsValidations from '../validations/timesheets';

const router = express.Router();

router
  .get('/', timesheetsControllers.getAllTimesheets)
  .get('/:id', timesheetsControllers.getTimesheetById)
  .post('/', timesheetsValidations.validationsTimesheets, timesheetsControllers.createTimesheet)
  .put('/:id', timesheetsValidations.validationsTimesheets, timesheetsControllers.updateTimesheets)
  .delete('/:id', timesheetsControllers.deleteTimesheet);

export default router;
