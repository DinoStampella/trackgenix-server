import Tasks from '../models/Tasks';

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskFound = await Tasks.findByIdAndDelete(id);
    if (!taskFound) {
      return res.status(400).json({
        message: `The task with the id ${id} was not found`,
        success: true,
      });
    }
    return res.status(204).json({
      message: `Task with id ${id} deleted succesfully`,
      success: true,
      data: taskFound,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    console.log(updates);
    const taskFound = await Tasks.findByIdAndUpdate(
      id,
      updates,
      { new: true },
    );
    if (!taskFound) {
      res.status(404).json({
        message: `Couldn't find task with id ${id}`,
        success: false,
      });
    } else {
      res.status(200).json({
        message: `Modified task with id ${id}`,
        success: true,
        data: taskFound,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

export default {
  deleteTask,
  updateTask,
};
