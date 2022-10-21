import Tasks from '../models/Tasks';

const { ObjectId } = require('mongoose').Types;

function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if ((String)(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
}

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
  const task = await Tasks.findById(req.params.id);
  try {
    if (!task) {
      return res.status(404).json({
        message: 'There is no task with this id',
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Task found',
      data: task,
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

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: `Invalid id ${id}`,
        error: true,
      });
    }
    const taskFound = await Tasks.findByIdAndUpdate(
      id,
      req.body,
      { new: true },
    );
    if (!taskFound) {
      return res.status(404).json({
        message: `Couldn't find task with id ${id}`,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Modified task with id ${id}`,
      data: taskFound,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'error server',
      error: true,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: `Invalid id ${id}`,
        error: true,
      });
    }
    const taskFound = await Tasks.findByIdAndDelete(id);
    if (!taskFound) {
      return res.status(404).json({
        message: `The task with the id ${id} was not found`,
        error: true,
      });
    }
    return res.status(204);
  } catch (error) {
    return res.status(500).json({
      message: 'error server',
      error: true,
    });
  }
};

export default {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
