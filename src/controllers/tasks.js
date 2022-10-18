import Tasks from '../models/Tasks';

const { ObjectId } = require('mongoose').Types;

const isValidObjectId = (id) => {
  if (ObjectId.isValid(id)) {
    if ((String)(new ObjectId(id)) === id) { return true; }
    return false;
  }
  return false;
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: `Invalid id ${id}`,
        error: true,
      });
    }
    const taskFound = await Tasks.findByIdAndDelete(id);
    if (!taskFound) {
      return res.status(400).json({
        message: `The task with the id ${id} was not found`,
        error: true,
      });
    }
    return res.status(204).json({
      message: `Task with id ${id} deleted succesfully`,
      data: taskFound,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: `Invalid id ${id}`,
        error: true,
      });
    }
    const taskFound = await Tasks.findByIdAndUpdate(
      id,
      updates,
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
      error: true,
    });
  }
};

export default {
  deleteTask,
  updateTask,
};
