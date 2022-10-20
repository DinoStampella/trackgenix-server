import express from 'express';
import timesheetsControllers from '../controllers/timesheets';
import timesheetsValidations from '../validations/timesheets';

const router = express.Router();

router
  .get('/', timesheetsControllers.getAllTimesheets)
  .get('/:id', timesheetsControllers.getTimesheetById)
  .post('/', timesheetsValidations.validationsTimesheets, timesheetsControllers.createTimesheet)
  .delete('/:id', timesheetsControllers.deleteTimesheet)
  .put('/:id', timesheetsValidations.validationsTimesheets, timesheetsControllers.updateTimesheets);

export default router;
