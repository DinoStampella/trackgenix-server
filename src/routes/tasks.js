import express from 'express';
import {
  getAllTasks, getTaskById, createTask, updateTask, deleteTask,
} from '../controllers/tasks';
import validateTask from '../validations/tasks';

const router = express.Router();

router
  .get('/', getAllTasks)
  .get('/:id', getTaskById)
  .post('/', validateTask, createTask)
  .put('/:id', validateTask, updateTask)
  .delete('/:id', deleteTask);

export default router;
