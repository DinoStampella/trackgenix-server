const express = require("express");
const fs = require("fs");
const employees = require("../data/employees.json");
const router = express.Router();

router.delete("/delete/:id", (req, res) => {
    const idEmployee = req.params.id.toString()
    console.log(idEmployee)
    const filteredEmployee = employees.filter((employee) => employee.id !== idEmployee)
    console.log(filteredEmployee);
    fs.writeFile("src/data/employees.json", JSON.stringify(filteredEmployee), (err) => {
        if(err) {
            res.send("Unable to delete employee")
        } else {
            res.send("Eliminated employee")
        }
    })
});

module.exports = router;