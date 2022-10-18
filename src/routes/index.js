import express from 'express';

import tasksRoutes from './tasks';
import adminsRoutes from './admins';

const router = express.Router();

router.use('/tasks', tasksRoutes);
router.use('/admins', adminsRoutes);

export default router;
