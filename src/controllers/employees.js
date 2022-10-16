import Employee from '../models/Employees';

const deleteEmployee = async (req, res) => {
  try {
    const idEmployee = req.params.id;
    const result = await Employee.findByIdAndDelete(idEmployee);

    return res.status(200).json({
      message: 'Employee deleted successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};
// router.delete('/:id', (req, res) => {
//   const idEmployee = parseInt(req.params.id, 10);
//   const filteredEmployee = employees.filter((employee) => employee.id !== idEmployee);
//   const deleteEmloyee = employees.find((employee) => employee.id === idEmployee);
//   if (deleteEmloyee) {
//     fs.writeFile('src/data/employees.json', JSON.stringify(filteredEmployee), (err) => {
//       if (err) {
//         res.status(400).json({
//           success: false,
//         });
//       } else {
//         res.status(200).json({
//           success: true,
//           msg: 'Employee deleted successfully',
//           data: employees,
//         });
//       }
//     });
//   } else {
//     res.status(404).json({
//       success: false,
//       msg: 'There is no Employee with this id',
//     });
//   }
// });

// router.put('/:id', (req, res) => {
//   const idEmployee = parseInt(req.params.id, 10);
//   const employee = employees.find((emp) => emp.id === idEmployee);
//   if (employee) {
//     const index = employees.indexOf(employee);
//     const newEmployee = req.body;
//     employees[index] = newEmployee;
//     fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
//       if (err) {
//         res.status(400).json({
//           success: false,
//         });
//       } else {
//         res.status(200).json({
//           success: true,
//           msg: 'Employee modified successfully',
//           data: employees,
//         });
//       }
//     });
//   } else {
//     res.status(404).json({
//       success: false,
//       msg: 'There is no Employee with this id',
//     });
//   }
// });

export default { deleteEmployee };
