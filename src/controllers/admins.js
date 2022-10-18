import Admins from '../models/Admins';

const { ObjectId } = require('mongoose').Types;

/* function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if ((String)(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
}
 */
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
    return res.status(204);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const modifyAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: `Invalid id: ${id}`,
        error: true,
      });
    }
    const adminFound = await Admins.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );
    if (adminFound == null) {
      return res.status(404).json({
        message: `Couldn't find admin with id ${id}`,
        data: undefined,
        error: true,
      });
    }
    return res.status(201).json({
      message: `Admin with id ${id} modified succesfully`,
      data: adminFound,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
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
  modifyAdmin,
};
