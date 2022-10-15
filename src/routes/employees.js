import express from 'express';
import employees from '../controllers/employees';
import employeesValidations from '../validations/employees';

const router = express.Router();

router
  .get('/', employees.getAllEmployees)
  .get('/:id', employees.getEmployeeById)
  .post('/', employeesValidations.validateCreation, employees.createEmployee);

export default router;
