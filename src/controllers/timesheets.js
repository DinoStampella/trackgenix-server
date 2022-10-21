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

const getAllTimesheets = async (req, res) => {
  try {
    const timesheets = await Timesheets.find();
    if (timesheets.length === 0) {
      return res.status(404).json({
        message: 'Timesheet Not Found',
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Timesheet Found',
      data: timesheets,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Unexpected error ${error}`,
      error: true,
    });
  }
};

const getTimesheetById = async (req, res) => {
  try {
    const timesheetId = req.params.id;
    if (!isValidObjectId(timesheetId)) {
      return res.status(400).json({
        message: `Invalid id: ${req.params.id}`,
        error: true,
      });
    }
    const timesheets = await Timesheets.findById(timesheetId);
    if (!timesheets) {
      return res.status(404).json({
        message: 'Timesheet Not Found',
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Timesheet Found',
      data: timesheets,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Unexpected error ${error}`,
      error: true,
    });
  }
};

const createTimesheet = async (req, res) => {
  try {
    const timesheets = await Timesheets.create(req.body);

    return res.status(201).json({
      message: 'Timesheet Created',
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
    const updatedTimesheet = await Timesheets.findByIdAndUpdate(
      idTimesheets,
      req.body,
      { new: true },
    );
    if (!updatedTimesheet) {
      return res.status(400).json({
        message: `Couldn't find timesheets with id ${req.params.id}`,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Modified timesheets with id ${req.params.id}`,
      data: updatedTimesheet,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error occurred: ${error.message}`,
      error: true,
    });
  }
};

const deleteTimesheet = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: `Invalid id: ${req.params.id}`,
        error: true,
      });
    }
    const idTimesheets = req.params.id;
    const deletedTimesheet = await Timesheets.findByIdAndDelete(idTimesheets);
    if (!deletedTimesheet) {
      return res.status(404).json({
        message: 'There is no Timesheets with this id',
        error: true,
      });
    }
    return res.status(204).json({
      message: 'Timesheets deleted successfully',
      data: deletedTimesheet,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Unexpected error ${error}`,
      error: true,
    });
  }
};

export default {
  getAllTimesheets,
  getTimesheetById,
  createTimesheet,
  updateTimesheets,
  deleteTimesheet,
};
