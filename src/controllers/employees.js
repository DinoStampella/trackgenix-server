import Employee from '../models/Employees';

const { ObjectId } = require('mongoose').Types;

const isValidObjectId = (id) => {
  if (ObjectId.isValid(id)) {
    if ((String)(new ObjectId(id)) === id) { return true; }
    return false;
  }
  return false;
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    return res.status(200).json({
      message: 'Employees found',
      data: employees,
      error: false,
    });
  } catch (error) {
    return res.status(500)({
      message: `Unexpected error ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const getEmployeeById = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: `Invalid id: ${req.params.id}`,
      error: true,
    });
  }
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        message: 'There is no employee with this id',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Employee found',
      data: employee,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Unexpected error ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);
    return res.status(201).json({
      message: 'Employee created',
      data: newEmployee,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Unexpected error ${error}`,
    });
  }
};

const deleteEmployee = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: `Invalid id: ${req.params.id}`,
      error: true,
    });
  }
  try {
    const idEmployee = req.params.id;
    const deletedEmployee = await Employee.findByIdAndDelete(idEmployee);
    if (!deletedEmployee) {
      return res.status(404).json({
        message: `The Employee with the id ${idEmployee} was not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(204);
  } catch (error) {
    return res.status(500).json({
      message: `Unexpected error ${error}`,
    });
  }
};

const updateEmployee = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: `Invalid id: ${req.params.id}`,
      error: true,
    });
  }
  try {
    const idEmployee = req.params.id;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      { _id: idEmployee },
      { ...req.body },
      { new: true },
    );
    if (!updatedEmployee) {
      return res.status(404).json({
        message: `The Employee with the id ${idEmployee} was not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `The Employee with the id ${idEmployee} was updated successfully`,
      data: updatedEmployee,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Unexpected error ${error}`,
    });
  }
};

export default {
  getAllEmployees, getEmployeeById, createEmployee, deleteEmployee, updateEmployee,
};
