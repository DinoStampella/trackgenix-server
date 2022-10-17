import Projects from '../models/Projects';

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Projects.findByIdAndDelete(id);
    return res.status(200).json({
      message: `Project whit id ${id} deleted.`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error dale papa',
      error,
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
      message: `Project whit id ${id} edited`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error occurred',
      error,
    });
  }
};

export default {
  deleteProject,
  editProject,
};
