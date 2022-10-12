import express from "express";
const fs = require("fs");
const employees = require("../data/employees.json");
const router = express.Router();

router.delete("/:id", (req, res) => {
    const idEmployee = parseInt(req.params.id)
    const filteredEmployee = employees.filter((employee) => employee.id !== idEmployee)
    const deleteEmloyee = employees.find((employee) => employee.id === idEmployee)
    if(deleteEmloyee) {
    fs.writeFile("src/data/employees.json", JSON.stringify(filteredEmployee), (err) => {
        if(err) {
            res.status(400).json({
                success: false
            });
        } else {
            res.status(200).json({
                success: true,
                msg: "Employee deleted successfully",
                data: employees
        });
        }
    })
}else {
        res.status(404).json({
            success: false,
            msg: "There is no Employee with this id"
        });
    }
});

router.put("/:id", (req, res) => {
    const idEmployee = parseInt(req.params.id)
    const employee = employees.find((employee) => employee.id === idEmployee)
    if(employee) {
        const index = employees.indexOf(employee);
        const newEmployee = req.body;
        employees[index] = newEmployee;
        fs.writeFile("src/data/employees.json", JSON.stringify(employees), (err) => {
            if(err) {
                res.status(400).json({
                    success: false
                });
            } else {
                res.status(200).json({
                    success: true,
                    msg: "Employee modified successfully",
                    data: employees
                });
            }
        });
    } else {
        res.status(404).json({
            success: false,
            msg: "There is no Employee with this id"
            });
    }
})

module.exports = router;