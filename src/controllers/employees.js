import Employee from '../models/Employees';

const getEmployees = async (req, res) => {
  const result = await Employee.find();
  return res.status(200).json({
    message: 'The successfully',
    data: result,
    error: false,
  });
};
const deleteEmployee = async (req, res) => {
  try {
    const idEmployee = req.params.id;
    const result = await Employee.findByIdAndDelete(idEmployee);
    if (!result) {
      return res.status(404).json({
        message: `The Employee with the id ${idEmployee} was not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `The Employee with the id ${idEmployee} was deleted successfully`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const editEmployee = async (req, res) => {
  try {
    const idEmployee = req.params.id;
    const result = await Employee.findByIdAndUpdate(
      { _id: idEmployee },
      { ...req.body },
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: `The Employee with the id ${idEmployee} was not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `The Employee with the id ${idEmployee} was edited successfully`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

export default { getEmployees, deleteEmployee, editEmployee };
