import express from 'express';
import {
  getAllTasks, getTaskById, createTask, updateTask, deleteTask,
} from '../controllers/tasks';
import validateTask from '../validations/tasks';
import checkAuth from '../middelwares/authMiddelware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getAllTasks)
  .get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getTaskById)
  .post('/', checkAuth(['SUPER_ADMIN', 'ADMIN']), validateTask, createTask)
  .put('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), validateTask, updateTask)
  .delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), deleteTask);

export default router;
