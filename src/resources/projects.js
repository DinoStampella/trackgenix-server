import express from 'express';
import fs from 'fs';

const projects = require('../data/projects.json');

const router = express.Router();

const validateTeamMembers = (teamMembers) => {
  let amount = 0;
  let member;
  let i;
  for (i = 0; i < teamMembers.length; i += 1) {
    member = teamMembers[i];

    if (!member.id || !member.role || !member.rate) {
      return 'Elements id, role and rate can not be empty';
    }

    if (member.role !== 'PM' && member.role !== 'TL' && member.role !== 'DEV' && member.role !== 'QA') {
      return 'Valid roles are PM/TL/DEV/QA';
    }

    if (member.role === 'PM') {
      amount += 1;
      if (amount > 1) {
        return 'There can not be more than one PM role';
      }
    }
  }
  return '';
};

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'Project found succesfully',
    data: projects,
  });
});

router.get('/:id', (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  const foundProject = projects.find((project) => project.id === projectId);
  if (foundProject) {
    res.status(200).json({
      success: true,
      msg: 'Project found succesfully',
      data: foundProject,
    });
  } else {
    res.status(404).json({
      succes: false,
      msg: 'There is no project with this id',
      data: '',
    });
  }
});

router.post('/', (req, res) => {
  let errors = '';
  const newProject = req.body;
  const checkData = (data, err) => {
    if (!newProject[data]) {
      errors += err;
    }
  };
  newProject.id = (projects.length + 1).toString();
  projects.push(newProject);
  checkData('projectName', 'Project needs a name. ');
  checkData('description', 'Project needs a description. ');
  checkData('startDate', 'Project needs a start date. ');
  newProject.status = newProject.endDate ? newProject.status : 'active';
  checkData('status', 'Project needs a status. ');
  if (errors === '') {
    fs.writeFile('./src/data/projects.json', JSON.stringify(projects, null, 2), (err) => {
      if (err) {
        res.status(400).json({
          success: false,
        });
        return;
      }
      res.status(201).json({
        success: true,
        msg: 'Project created successfully',
        data: newProject,
      });
    });
  } else {
    res.status(400).json({
      success: false,
      msg: errors,
    });
  }
});

router.put('/:id', (req, res) => {
  const requestProject = req.body;
  const projectId = parseInt(req.params.id, 10);
  const foundProject = projects.find((project) => project.id === projectId);
  if (!foundProject) {
    res.status(404).json({
      success: false,
      msg: 'There is no project with this id',
      data: '',
    });
    return;
  }

  if (requestProject.projectName) {
    foundProject.projectName = requestProject.projectName;
  }
  if (requestProject.description) {
    foundProject.description = requestProject.description;
  }
  if (requestProject.startDate) {
    foundProject.startDate = requestProject.startDate;
  }
  if (requestProject.endDate) {
    foundProject.endDate = requestProject.endDate;
  }
  if (requestProject.status) {
    foundProject.status = requestProject.status;
  }
  if (requestProject.teamMembers) {
    const errMsg = validateTeamMembers(requestProject.teamMembers);
    if (errMsg !== '') {
      res.status(400).json({
        success: false,
        msg: errMsg,
        data: '',
      });
      return;
    }
    foundProject.teamMembers = requestProject.teamMembers;
  }

  fs.writeFile('src/data/projects.json', JSON.stringify(projects, null, 2), (err) => {
    if (err) {
      res.status(400).json({
        success: false,
      });
    } else {
      res.status(200).json({
        succes: true,
        msg: 'Project modified succesfully',
        data: foundProject,
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  const projectId = req.params.id;
  const filteredProject = projects.filter((project) => project.id !== projectId);
  const projectExists = projects.find((project) => project.id === projectId);
  if (projectExists) {
    fs.writeFile('./src/data/projects.json', JSON.stringify(filteredProject, null, 2), (err) => {
      if (err) {
        res.status(400).json({
          success: false,
        });
        return;
      }
      res.status(200).json({
        succes: true,
        msg: 'Project deleted successfully',
      });
    });
  } else {
    res.status(404).json({
      success: false,
      msg: `There is no project with this id (${projectId})`,
    });
  }
});

export default router;
