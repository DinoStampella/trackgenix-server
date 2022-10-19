import express from 'express';
import timesheetControllers from '../controllers/timesheets';
import timesheetValidations from '../validations/timesheets';

const router = express.Router();

router
  .get('/', timesheetControllers.getAllTimesheets)
  .get('/:id', timesheetControllers.getTimesheetById)
  .post('/', timesheetValidations.validateCreation, timesheetControllers.createTimesheet);
export default router;
