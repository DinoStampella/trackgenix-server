import SuperAdmins from '../models/Super-admins';

const { ObjectId } = require('mongoose').Types;

const isValidObjectId = (id) => {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) {
      return true;
    }
    return false;
  }
  return false;
};

const getAllSuperAdmins = async (req, res) => {
  try {
    const superAdmins = await SuperAdmins.find();
    if (!superAdmins.length) {
      return res.status(404).json({
        message: 'No Super Admins found',
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Super Admins found',
      data: superAdmins,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error occurred: ${error.message}`,
      error: true,
    });
  }
};

const getSuperAdminsById = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: `Invalid id: ${req.params.id}`,
      error: true,
    });
  }
  try {
    const idSuperAdmin = req.params.id;
    const superAdminsId = await SuperAdmins.findById(idSuperAdmin);
    if (!superAdminsId) {
      return res.status(404).json({
        message: 'There is no Super Admins with this id',
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Super Admins found',
      data: superAdminsId,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error occurred: ${error.message}`,
      error: true,
    });
  }
};

const createSuperAdmins = async (req, res) => {
  try {
    const newSuperAdmin = new SuperAdmins({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      dni: req.body.dni,
      phone: req.body.phone,
      location: req.body.location,
    });
    const result = await newSuperAdmin.save();
    return res.status(201).json({
      message: 'Super Admins created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error occurred: ${error.message}`,
      error: true,
    });
  }
};

export default {
  getAllSuperAdmins,
  getSuperAdminsById,
  createSuperAdmins,
};
