const express = require ('express');
const employees = require('../data/employees.json');
const router = express.Router();
const fs = require('fs');
router.use(express.urlencoded({extended: false}));

router.get('/getAll', (req, res) => {
    res.send(employees)
});

router.get('/getById/:id', (req, res) => {
    const employeeId = req.params.id;
    const foundEmployee = employees.find((employee) => employee.id === employeeId);
    if(foundEmployee){
        res.status(200).json({
            success: true,
            msg: 'Employee found',
            data: foundEmployee
        });
    } else{
        res.status(404).json({
            success: false,
            msg: 'Employee not found',
        });
    }
});

router.post('/add/', (req, res) => {
    const newEmployee = req.body;
    console.log(newEmployee);
    employees.push(newEmployee);
    fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
        if (err) {
            res.status(400).json({
                success: false,
                msg: 'Bad request',
            });
        }else {
            res.status(201).json({
                success: true,
                msg: 'Employee created',
                newEmployee: newEmployee
            });
        }
    });
});

module.exports = router;
