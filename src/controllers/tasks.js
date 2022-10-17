import Tasks from '../models/Tasks';

const { ObjectId } = require('mongoose').Types;

const deleteTask = async (req, res) => {
  const isValidObjectId = (id) => ObjectId.isValid(id) && ((String)(new ObjectId(id)) === id);
  try {
    const { id } = req.params;
    const taskFound = await Tasks.findByIdAndDelete(id);
    if (!isValidObjectId) {
      return res.status(400).json({
        message: `Invalid id: ${req.params.id}`,
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
      success: false,
    });
  }
};

export default {
  deleteTask,
};
