import express from 'express';
import tasksValidations from '../validations/tasks';
import tasksControllers from '../controllers/tasks';

const router = express.Router();

router.get('/', tasksControllers.getAllTasks);
router.get('/:id', tasksControllers.getTaskById);
router.post('/', tasksValidations.validateCreation, tasksControllers.createTask);

export default router;