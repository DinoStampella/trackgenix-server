import Tasks from '../models/Tasks';
const { ObjectId } = require('mongoose').Types;


const deleteTask = async (req, res) => {
  // const isValidObjectId = (id) => {
  //   return ObjectId.isValid(id) && ((String)(new ObjectId(id)) === id)
  // }
  try {
    const { id } = req.params;
    const taskFound = await Tasks.findByIdAndDelete(id);
    return res.status(204).json({
      message: `Task with id ${id} deleted succesfully`,
      data: taskFound,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: `Couldn't find task with id ${id}`,
      data: undefined,
      error: true,
    });
  }
}


export default {
  deleteTask,
}
