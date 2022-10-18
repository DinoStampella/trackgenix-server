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
        message: 'No admins found',
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
    });
  }
};
const getAdminById = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: `Invalid id: ${req.params.id}`,
      error: true,
    });
  }
  try {
    const admin = await Admins.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({
        message: 'There is no admin with this id',
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admin found',
      data: admin,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Unexpected error ${error}`,
    });
  }
};
const createAdmin = async (req, res) => {
  try {
    const admin = await Admins.create(req.body);
    return res.status(201).json({
      message: 'Admin created',
      data: admin,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Unexpected error ${error}`,
    });
  }
};

export default {
  getAllAdmins,
  getAdminById,
  createAdmin,
};
