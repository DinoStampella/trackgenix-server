import Tasks from '../models/Tasks';

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
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
      success: false,
    });
  }
};

export default {
  deleteTask,
};
