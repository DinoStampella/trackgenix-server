import Employees from '../models/Employees';

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
    const employees = await Employees.find();
    if (!employees) {
      return res.status(404)({
        message: 'Admins not found',
        data: undefined,
        error: true,
      });
    }
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
    const employee = await Employees.findById(id);

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
    const newEmployee = await Employees.create(req.body);
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

export default {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
};
