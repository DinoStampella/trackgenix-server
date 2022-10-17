import Projects from '../models/Projects';

const getAllProjects = async (req, res) => {
  try {
    const projects = await Projects.find();
    return res.status(200).json({
      success: true,
      msg: 'Projects found succesfully',
      data: projects,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: 'An error ocurred',
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Projects.findById(id);
    return res.status(200).json({
      success: true,
      msg: 'Projects found succesfully',
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
    const Project = new Projects({
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      active: req.body.active,
      clientName: req.body.clientName,
      teamMembers: req.body.teamMembers,
    });

    const result = await Project.save();
    return res.status(201).json({
      success: true,
      msg: 'Project created successfully',
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error,
    });
  }
};

export default {
  getAllProjects,
  getProjectById,
  createProject,
};
