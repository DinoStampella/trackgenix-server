import express from 'express';
import tasksControllers from '../controllers/tasks';

const router = express.Router();

router
  .put('/:id', tasksControllers.updateTask)
  .delete('/:id', tasksControllers.deleteTask);

export default router;
