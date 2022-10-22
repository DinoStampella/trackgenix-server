import Admins from '../models/Admins';

const { ObjectId } = require('mongoose').Types;

const isValidObjectId = (id) => {
  if (ObjectId.isValid(id)) {
    if ((String)(new ObjectId(id)) === id) { return true; }
    return false;
  }
  return false;
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admins.find();
    if (!admins.length) {
      return res.status(404).json({
        message: 'Admins not found',
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admins found',
      data: admins,
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

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: `Invalid id: ${req.params.id}`,
        error: true,
      });
    }
    const admin = await Admins.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({
        message: `Couldn't find admin with id ${id}`,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Found admin with id ${id}`,
      data: admin,
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

const createAdmin = async (req, res) => {
  try {
    const admin = await Admins.create(req.body);
    return res.status(201).json({
      message: 'Admin created successfully',
      data: admin,
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

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: `Invalid id: ${id}`,
        error: true,
      });
    }
    const deletedAdmin = await Admins.findByIdAndDelete(id);
    if (deletedAdmin == null) {
      return res.status(404).json({
        message: `Couldn't find admin with id ${id}`,
        data: undefined,
        error: true,
      });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: `Unexpected error ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: `Invalid id: ${id}`,
        error: true,
      });
    }
    const updatedAdmin = await Admins.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );
    if (updatedAdmin == null) {
      return res.status(404).json({
        message: `Couldn't find admin with id ${id}`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Modified admin with id ${id}`,
      data: updatedAdmin,
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

export default {
  getAllAdmins,
  getAdminById,
  createAdmin,
  deleteAdmin,
  updateAdmin,
};
