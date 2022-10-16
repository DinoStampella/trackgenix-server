import Employees from '../models/Employees';

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
    return res.status(400)({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employees.findById(id);

    if (!employee) {
      return res.status(404).json({
        message: 'Employee not found',
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
    return res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const employee = new Employees({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      dni: req.body.dni,
      phone: req.body.phone,
      location: req.body.location,
    });
    const result = await employee.save();
    return res.status(201).json({
      message: 'Employee created succesfully',
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

export default {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
};
