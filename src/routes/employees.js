import express from 'express';
import {
  getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee,
} from '../controllers/employees';
import validateUser from '../validations/user';
import checkAuth from '../middelwares/authMiddelware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getAllEmployees)
  .get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getEmployeeById)
  .post('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), validateUser, createEmployee)
  .put('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), validateUser, updateEmployee)
  .delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), deleteEmployee);

export default router;
