const express = require('express');

const fs = require('fs');

const employees = require('../data/employees.json');

const router = express.Router();

router.use(express.urlencoded({ extended: false }));

router.get('/getAll', (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'Employees found successfully',
    data: employees,
  });
});

router.get('/getById/:id', (req, res) => {
  const employeeId = req.params.id;
  const foundEmployee = employees.find(
    (employee) => employee.id === employeeId
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

router.post('/add', (req, res) => {
  const newEmployee = req.body;
  employees.push(newEmployee);
  fs.writeFile(
    'src/data/employees.json',
    JSON.stringify(employees, null, 2),
    (err) => {
      if (err) {
        res.status(400).json({
          success: false,
          msg: 'Bad request',
        });
      } else {
        res.status(201).json({
          success: true,
          msg: 'Employee created successfully',
          data: newEmployee,
        });
      }
    }
  );
});

module.exports = router;
