import express from 'express';
import {
  getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee,
} from '../controllers/employees';
import validateUser from '../validations/user';

const router = express.Router();

router
  .get('/', getAllEmployees)
  .get('/:id', getEmployeeById)
  .post('/', validateUser, createEmployee)
  .put('/:id', validateUser, updateEmployee)
  .delete('/:id', deleteEmployee);

export default router;
