import express from 'express';
import employeesControllers from '../controllers/employees';
import userValidations from '../validations/user';

const router = express.Router();

router
  .delete('/:id', employeesControllers.deleteEmployee)
  .put('/:id', userValidations.validateCreation, employeesControllers.updateEmployee);

export default router;
