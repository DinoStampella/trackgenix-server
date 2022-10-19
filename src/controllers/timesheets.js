import Timesheets from '../models/Timesheets';

const { ObjectId } = require('mongoose').Types;

function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if ((String)(new ObjectId(id)) === id) { return true; }
    return false;
  }
  return false;
}

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
      message: `Unexpected error ${error}`,
      error: true,
    });
  }
};

export default {
  getAllTimesheets, getTimesheetById, createTimesheet,
};
