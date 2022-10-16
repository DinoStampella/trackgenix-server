import express from 'express';
import employeesConstrollers from '../controllers/employees';
import validateCreation from '../validations/employees';

const router = express.Router();

router
  .delete('/:id', employeesConstrollers.deleteEmployee)
  .put('/:id', validateCreation, employeesConstrollers.editEmployee);

export default router;
