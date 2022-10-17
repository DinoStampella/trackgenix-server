import express from 'express';
import tasksControllers from '../controllers/tasks';
// import tasksValidations from '../validations/tasks';

const router = express.Router();

router
  // .put('/', tasksControllers.)
  .delete('/:id', tasksControllers.deleteTask);

export default router;
