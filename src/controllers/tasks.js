import Tasks from '../models/Tasks';

const { ObjectId } = require('mongoose').Types;

const isValidObjectId = (id) => {
  if (ObjectId.isValid(id)) {
    if ((String)(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find();
    if (!tasks.length) {
      return res.status(404).json({
        message: 'No tasks found',
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Tasks found',
      data: tasks,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `There was an error: ${error}`,
    });
  }
};
const getTaskById = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: `Invalid id: ${req.params.id}`,
      error: true,
    });
  }
  try {
    const tasks = await Tasks.findById(req.params.id);
    if (!tasks) {
      return res.status(404).json({
        message: 'There is no task with this id',
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Task found',
      data: tasks,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `There was an error: ${error}`,
    });
  }
};
const createTask = async (req, res) => {
  try {
    const newTask = await Tasks.create(req.body);
    return res.status(201).json({
      message: 'Task created',
      data: newTask,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `There was an error: ${error}`,
    });
  }
};

export default {
  getAllTasks,
  getTaskById,
  createTask,
};
