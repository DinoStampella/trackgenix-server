import express from 'express';
import employeesConstrollers from '../controllers/employees';
// Faltan validaciones

const router = express.Router();

router
  .get('/', employeesConstrollers.getEmployees)
  .delete('/:id', employeesConstrollers.deleteEmployee)
  .put('/:id', employeesConstrollers.editEmployee);

export default router;
