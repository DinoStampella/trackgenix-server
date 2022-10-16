import express from 'express';
import superAdmins from './super-admins';

const router = express.Router();
router.use('/super-admins', superAdmins);

export default router;
