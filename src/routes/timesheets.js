import express from 'express';
import {
  getAllTimesheets, getTimesheetById, createTimesheet, updateTimesheets, deleteTimesheet,
} from '../controllers/timesheets';
import validateTimesheet from '../validations/timesheets';
import checkAuth from '../middelwares/authMiddelware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getAllTimesheets)
  .get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getTimesheetById)
  .post('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), validateTimesheet, createTimesheet)
  .put('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), validateTimesheet, updateTimesheets)
  .delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), deleteTimesheet);

export default router;
