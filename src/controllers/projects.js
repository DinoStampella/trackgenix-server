import Projects from '../models/Projects';

const { ObjectId } = require('mongoose').Types;

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
      error: true,
    });
  }
};

const getProjectById = async (req, res) => {
  const isValidObjectId = (id) => {
    if (ObjectId.isValid(id)) {
      if ((String)(new ObjectId(id)) === id) {
        return true;
      }
    }
    return false;
  };
  try {
    const { id } = req.params;
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: `Invalid id: ${req.params.id}`,
        data: undefined,
        error: true,
      });
    }
    const project = await Projects.findById(id);
    if (!project) {
      return res.status(404).json({
        msg: `Couldnt find project with id ${id}`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'Project found succesfully',
      data: project,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'An error ocurred',
      data: undefined,
      error: false,
    });
  }
};

const createProject = async (req, res) => {
  try {
    const newProject = new Projects({
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      active: req.body.active,
      clientName: req.body.clientName,
      teamMembers: req.body.teamMembers,
    });

    const result = await newProject.save();
    return res.status(201).json({
      msg: 'Project created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllProjects,
  getProjectById,
  createProject,
};
