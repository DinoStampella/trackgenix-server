import express from 'express';
import tasksValidations from '../validations/tasks';
import tasksControllers from '../controllers/tasks';

const router = express.Router();

router
  .get('/', tasksControllers.getAllTasks)
  .get('/:id', tasksControllers.getTaskById)
  .post('/', tasksValidations.validateCreation, tasksControllers.createTask)
  .put('/:id', tasksControllers.updateTask)
  .delete('/:id', tasksControllers.deleteTask);

export default router;
