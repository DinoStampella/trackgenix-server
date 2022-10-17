import Projects from '../models/Projects';

const { ObjectId } = require('mongoose').Types;

const getAllProjects = async (req, res) => {
  try {
    const projects = await Projects.find();
    if (!projects) {
      return res.status(404).json({
        success: false,
        msg: 'Projects not found.',
      });
    }
    return res.status(201).json({
      success: true,
      msg: 'Projects found succesfully',
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
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
        error: true,
      });
    }
    const project = await Projects.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        msg: `Couldnt find project with id ${id}`,
      });
    }
    return res.status(200).json({
      success: true,
      msg: 'Project found succesfully',
      data: project,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: 'An error ocurred',
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
      success: true,
      msg: 'Project created successfully',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
    });
  }
};

export default {
  getAllProjects,
  getProjectById,
  createProject,
};
