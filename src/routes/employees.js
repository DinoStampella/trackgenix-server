import express from 'express';

import employees from '../controllers/employees';

const router = express.Router();

router
  .get('/', employees.getAllEmployees)
  .get('/:id', employees.getEmployeeById);

export default router;
