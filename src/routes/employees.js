import express from 'express';
import employeesControllers from '../controllers/employees';
import userValidations from '../validations/user';

const router = express.Router();

router
  .get('/', employeesControllers.getAllEmployees)
  .get('/:id', employeesControllers.getEmployeeById)
  .post('/', userValidations.validateCreation, employeesControllers.createEmployee);

export default router;
