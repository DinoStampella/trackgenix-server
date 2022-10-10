/* eslint-disable no-console */
const express = require('express');
const fs = require('fs');
const projectsList = require('../data/projects.json');

const router = express.Router();

function validateTeamMembers(teamMembers) {
  let amount = 0;
  let member;
  let i;
  for (i = 0; i < teamMembers.length; i += 1) {
    member = teamMembers[i];

    if (!member.id || !member.role || !member.rate) {
      return 'id, role and rate can not be empty';
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
}

router.get('/getAll', (req, res) => {
  res.status(200).json({
    succes: true,
    msg: 'Project found succesfully',
    data: projectsList,
  });
});

router.get('/getById/:id', (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  const foundProject = projectsList.find((project) => project.id === projectId);
  if (foundProject) {
    res.status(200).json({
      succes: true,
      msg: 'Project found succesfully',
      data: foundProject,
    });
  } else {
    res.status(404).json({
      succes: false,
      msg: 'There is not project with this id',
      data: '',
    });
  }
});

router.put('/put/:id', (req, res) => {
  const requestProject = req.body;
  const projectId = parseInt(req.params.id, 10);
  const foundProject = projectsList.find((project) => project.id === projectId);
  if (!foundProject) {
    res.status(404).json({
      succes: false,
      msg: 'Project not found',
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
        succes: false,
        msg: errMsg,
        data: '',
      });
      return;
    }
    foundProject.teamMembers = requestProject.teamMembers;
  }

  fs.writeFile('src/data/projects.json', JSON.stringify(projectsList, null, 2), (err) => {
    if (err) {
      res.status(400).json({
        succes: false,
        msg: 'Can not write project file',
        data: '',
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

module.exports = router;
