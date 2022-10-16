import Timesheets from '../models/Timesheets';

const getAllTimesheets = async (req, res) => {
  try {
    const timesheets = await Timesheets.find();

    return res.status(200).json({
      message: 'Timesheet Found',
      data: timesheets,
      error: false,
    });
  } catch {
    return res.status(404).json({
      message: 'Timesheet Not Found',
      error: true,
    });
  }
};

const getAllTimesheetById = async (req, res) => {
  try {
    const timesheetId = req.params.id;
    const timesheets = await Timesheets.findById(timesheetId);

    return res.status(200).json({
      message: 'Timesheet Found',
      data: timesheets,
      error: false,
    });
  } catch {
    return res.status(404).json({
      message: 'Timesheet Not Found',
      error: true,
    });
  }
};

const createTimesheet = async (req, res) => {
  try {
    const requestTimesheet = req.body;
    const timesheets = await Timesheets.create(requestTimesheet);

    return res.status(201).json({
      message: 'Timesheet Created',
      data: timesheets,
      error: false,
    });
  } catch {
    return res.status(400).json({
      message: 'Can Not Create Timesheet',
      error: true,
    });
  }
};

export default {
  getAllTimesheets, getAllTimesheetById, createTimesheet,
};
