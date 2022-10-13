import express from 'express';

import fs from 'fs';

const employees = require('../data/employees.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'Employees found successfully',
    data: employees,
  });
});

router.get('/:id', (req, res) => {
  const employeeId = parseInt(req.params.id, 10);
  const foundEmployee = employees.find(
    (employee) => employee.id === employeeId,
  );
  if (foundEmployee) {
    res.status(200).json({
      success: true,
      msg: 'Employee found successfully',
      data: foundEmployee,
    });
  } else {
    res.status(404).json({
      success: false,
      msg: 'There is no employee with this id',
    });
  }
});

router.post('/:', (req, res) => {
  const newEmployee = req.body;
  employees.push(newEmployee);
  fs.writeFile(
    'src/data/employees.json',
    JSON.stringify(employees, null, 2),
    (err) => {
      if (err) {
        res.status(400).json({
          success: false,
        });
      } else {
        res.status(201).json({
          success: true,
          msg: 'Employee created successfully',
          data: newEmployee,
        });
      }
    },
  );
});

router.delete('/:id', (req, res) => {
  const idEmployee = parseInt(req.params.id, 10);
  const filteredEmployee = employees.filter((employee) => employee.id !== idEmployee);
  const deleteEmloyee = employees.find((employee) => employee.id === idEmployee);
  if (deleteEmloyee) {
    fs.writeFile('src/data/employees.json', JSON.stringify(filteredEmployee), (err) => {
      if (err) {
        res.status(400).json({
          success: false,
        });
      } else {
        res.status(200).json({
          success: true,
          msg: 'Employee deleted successfully',
          data: employees,
        });
      }
    });
  } else {
    res.status(404).json({
      success: false,
      msg: 'There is no Employee with this id',
    });
  }
});

router.put('/:id', (req, res) => {
  const idEmployee = parseInt(req.params.id, 10);
  const employee = employees.find((emp) => emp.id === idEmployee);
  if (employee) {
    const index = employees.indexOf(employee);
    const newEmployee = req.body;
    employees[index] = newEmployee;
    fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
      if (err) {
        res.status(400).json({
          success: false,
        });
      } else {
        res.status(200).json({
          success: true,
          msg: 'Employee modified successfully',
          data: employees,
        });
      }
    });
  } else {
    res.status(404).json({
      success: false,
      msg: 'There is no Employee with this id',
    });
  }
});

export default router;
