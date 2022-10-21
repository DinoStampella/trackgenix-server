import Projects from '../models/Projects';

const { ObjectId } = require('mongoose').Types;

const isValidObjectId = (id) => {
  if (ObjectId.isValid(id)) {
    if ((String)(new ObjectId(id)) === id) { return true; }
    return false;
  }
  return false;
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await Projects.find();
    if (!projects) {
      return res.status(404).json({
        message: 'Projects not found.',
        data: undefined,
        error: true,
      });
    }
    return res.status(201).json({
      message: 'Projects found succesfully',
      data: projects,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: `Invalid id: ${req.params.id}`,
        error: true,
      });
    }
    const project = await Projects.findById(id);
    if (!project) {
      return res.status(404).json({
        message: `Couldn't find project with id ${id}`,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Project found succesfully',
      data: project,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error ocurred',
      error: false,
    });
  }
};

const createProject = async (req, res) => {
  try {
    const newProject = await Projects.create(req.body);
    return res.status(201).json({
      message: 'Project created successfully',
      data: newProject,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'error in the server',
      error: true,
    });
  }
};

const editProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (isValidObjectId(id)) {
      const result = await Projects.findByIdAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true },
      );
      if (result !== null) {
        return res.status(200).json({
          message: `Modified project whit id ${id}`,
          data: result,
          error: false,
        });
      }
      return res.status(404).json({
        message: `there is not project with this id ${id}.`,
        error: true,
      });
    }
    return res.status(404).json({
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

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (isValidObjectId(id)) {
      const result = await Projects.findByIdAndDelete(id);
      if (result !== null) {
        return res.status(204).json({
          data: result,
          error: false,
        });
      }
      return res.status(404).json({
        message: `there is not project with this id ${id}.`,
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

export default {
  getAllProjects,
  getProjectById,
  createProject,
  editProject,
  deleteProject,
};
