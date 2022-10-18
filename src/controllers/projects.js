import Projects from '../models/Projects';

const { ObjectId } = require('mongoose').Types;

function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if ((String)(new ObjectId(id)) === id) { return true; }
    return false;
  }
  return false;
}

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (isValidObjectId(id)) {
      const result = await Projects.findByIdAndDelete(id);
      if (result !== null) {
        return res.status(200).json({
          message: `Project whit id ${id} deleted.`,
          data: result,
          error: false,
        });
      }
      return res.status(404).json({
        message: `there is not any project with that id ${id}.`,
        error: true,
      });
    }
    return res.status(400).json({
      message: `Invalid id ${id}.`,
      error: true,
    });
  } catch (error) {
    return res.status(500)({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const editProject = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Projects.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );
    return res.status(200).json({
      message: `Modified project whit id ${id}`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500)({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

export default {
  deleteProject,
  editProject,
};
