import Timesheets from '../models/Timesheets';

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

const deleteTimesheets = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: `Invalid id: ${req.params.id}`,
        error: true,
      });
    }
    const idTimesheets = req.params.id;
    const timesheets = await Timesheets.findByIdAndDelete(idTimesheets);
    if (!timesheets) {
      return res.status(404).json({
        message: 'There is no Timesheets with this id',
        error: true,
      });
    }
    return res.status(204).json({
      message: 'Timesheets deleted successfully',
      data: timesheets,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error occurred: ${error.message}`,
      error: true,
    });
  }
};

const updateTimesheets = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: `Invalid id: ${req.params.id}`,
        error: true,
      });
    }
    const idTimesheets = req.params.id;
    const timesheetsUpdate = req.body;
    const timesheets = await Timesheets.findByIdAndUpdate(
      idTimesheets,
      timesheetsUpdate,
      { new: true },
    );
    if (!timesheets) {
      return res.status(400).json({
        message: `Couldn't find timesheets with id ${req.params.id}`,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Modified timesheets with id ${req.params.id}`,
      data: timesheets,
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
  deleteTimesheets,
  updateTimesheets,
};
