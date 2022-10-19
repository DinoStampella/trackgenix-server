import express from 'express';
import tasksValidations from '../validations/tasks';
import tasksControllers from '../controllers/tasks';

const router = express.Router();

router.put('/:id', tasksControllers.updateTask);
router.delete('/:id', tasksControllers.deleteTask);
router.get('/', tasksControllers.getAllTasks);
router.get('/:id', tasksControllers.getTaskById);
router.post('/', tasksValidations.validateCreation, tasksControllers.createTask);

export default router;
