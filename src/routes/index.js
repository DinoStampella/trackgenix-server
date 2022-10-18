import express from 'express';
import superAdmins from './super-admins';
import timesheets from './timesheets';

const router = express.Router();
router.use('/super-admins', superAdmins);
router.use('/timesheets', timesheets);

export default router;
