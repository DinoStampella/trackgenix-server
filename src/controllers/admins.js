import Admins from '../models/Admins';

const { ObjectId } = require('mongoose').Types;

function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if ((String)(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
}

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
  deleteAdmin,
  modifyAdmin,
};
