import express from 'express';
import timesheetsControllers from '../controllers/timesheets';
import timesheetsValidations from '../validations/timesheets';

const router = express.Router();

router.delete('/:id', timesheetsControllers.deleteTimesheet);
router.put('/:id', timesheetsValidations.validationsTimesheets, timesheetsControllers.updateTimesheets);

export default router;
