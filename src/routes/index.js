import express from 'express';
import employeesRoutes from './employees';
import tasksRoutes from './tasks';
import adminsRoutes from './admins';
import projectsRoutes from './projects';

const router = express.Router();

router.use('/projects', projectsRoutes);
router.use('/employees', employeesRoutes);
router.use('/tasks', tasksRoutes);
router.use('/admins', adminsRoutes);

export default router;
