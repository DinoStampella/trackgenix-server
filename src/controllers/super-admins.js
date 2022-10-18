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
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: `Invalid id: ${req.params.id}`,
        error: true,
      });
    }
    const idSuperAdmin = req.params.id;
    const superAdmins = await SuperAdmins.findById(idSuperAdmin);
    if (!superAdmins) {
      return res.status(404).json({
        message: 'There is no Super Admins with this id',
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

const createSuperAdmins = async (req, res) => {
  try {
    const newSuperAdmin = new SuperAdmins(req.body);
    const newSuperAdminSaved = await newSuperAdmin.save();
    return res.status(201).json({
      message: 'Super Admins created successfully',
      data: newSuperAdminSaved,
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
