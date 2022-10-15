import express from 'express';
import employeesControllers from '../controllers/employees';

const router = express.Router();

router
  .get('/', employeesControllers.getAllEmployees)
  .get('/:id', employeesControllers.getEmployeeById);

export default router;
