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
    const projects = await Projects.find(req.query).populate('teamMembers.employee');
    if (!projects) {
      return res.status(404).json({
        message: 'Projects not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Projects found',
      data: projects,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Unexpected error ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: `Invalid id ${id}.`,
        error: true,
      });
    }
    const deletedProject = await Projects.findByIdAndDelete(id);
    if (deletedProject == null) {
      return res.status(404).json({
        message: `Couldn't find project with id ${id}`,
        error: true,
      });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: `Unexpected error ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(404).json({
        message: `Invalid id ${id}.`,
        error: true,
      });
    }
    const updatedProject = await Projects.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );
    if (updatedProject == null) {
      return res.status(404).json({
        message: `Couldn't find project with id ${id}`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Modified project with id ${id}`,
      data: updatedProject,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Unexpected error ${error}`,
      data: undefined,
      error: true,
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
    const project = await Projects.findById(id).populate('teamMembers.employee');
    if (!project) {
      return res.status(404).json({
        message: `Couldn't find project with id ${id}`,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Found project with id ${id}`,
      data: project,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Unexpected error ${error}`,
      data: undefined,
      error: true,
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
      message: `Unexpected error ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllProjects,
  getProjectById,
  createProject,
  deleteProject,
  updateProject,
};
