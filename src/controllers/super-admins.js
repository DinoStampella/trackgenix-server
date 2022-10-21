import superAdmins from '../models/Super-admins';

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
    const superAdmin = await superAdmins.find();
    if (!superAdmin.length) {
      return res.status(404).json({
        message: 'No Super Admins found',
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Super Admins found',
      data: superAdmin,
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
    const superAdmin = await superAdmins.findById(idSuperAdmin);
    if (!superAdmin) {
      return res.status(404).json({
        message: 'There is no Super Admins with this id',
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Super Admins found',
      data: superAdmin,
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
    // eslint-disable-next-line new-cap
    const newSuperAdmin = new superAdmins(req.body);
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

const updateSuperAdmins = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: `Invalid id: ${req.params.id}`,
        error: true,
      });
    }
    const result = await superAdmins.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );
    return res.status(200).json({
      message: `Modified Super admin with id ${id}`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Unexpected error ${error}`,
      error: true,
    });
  }
};

const deletedSuperAdmins = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: `Invalid id: ${req.params.id}`,
        error: true,
      });
    }
    const result = await superAdmins.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        message: `Super admin not found with id: ${id}`,
        error: true,
      });
    }
    return res.send(204);
  } catch (error) {
    return res.status(500).json({
      message: `Unexpected error ${error}`,
      error: true,
    });
  }
};

export default {
  getAllSuperAdmins,
  getSuperAdminsById,
  createSuperAdmins,
  updateSuperAdmins,
  deletedSuperAdmins,
};
