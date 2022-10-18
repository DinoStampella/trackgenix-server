import superAdmins from '../models/Super-admins';

const { ObjectId } = require('mongoose').Types;

const isValidObjectId = (id) => {
  if (ObjectId.isValid(id)) {
    if ((String)(new ObjectId(id)) === id) { return true; }
    return false;
  }
  return false;
};

const deleteSuperAdmins = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: `Invalid id: ${req.params.id}`,
      error: true,
    });
  }
  try {
    const { id } = req.params;
    const result = await superAdmins.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        message: `Super admin not found with id: ${id}`,
        error: true,
      });
    }
    return res.status(204).json({
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Unexpected error ${error}`,
      error: true,
    });
  }
};

const editSuperAdmins = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: `Invalid id: ${req.params.id}`,
      error: true,
    });
  }
  try {
    const { id } = req.params;
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

export default {
  deleteSuperAdmins,
  editSuperAdmins,
};
