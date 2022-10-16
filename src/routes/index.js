import express from 'express';

import timeSheetsRouter from './timesheets';

const router = express.Router();

router.use('/time-sheets', timeSheetsRouter);

export default router;
