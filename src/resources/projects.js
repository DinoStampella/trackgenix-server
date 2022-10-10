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
      return false;
    }

    if (member.role !== 'PM' && member.role !== 'TL' && member.role !== 'DEV' && member.role !== 'QA') {
      return false;
    }

    if (member.role === 'PM') {
      amount += 1;
      if (amount > 1) {
        return false;
      }
    }
  }
  return true;
}

router.get('/getAll', (req, res) => {
  res.send(projectsList);
});

router.get('/getById/:id', (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  const foundProject = projectsList.find((project) => project.id === projectId);
  if (foundProject) {
    res.send(foundProject);
  } else {
    res.status(404).json({
      response: 'error',
      msg: 'project  not found',
    });
  }
});

router.put('/put/:id', (req, res) => {
  const requestProject = req.body;
  const projectId = parseInt(req.params.id, 10);
  const foundProject = projectsList.find((project) => project.id === projectId);
  if (!foundProject) {
    res.status(404).json({
      response: 'error',
      msg: 'project not found',
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
    if (!validateTeamMembers(requestProject.teamMembers)) {
      res.status(400).json({
        response: 'error',
        msg: 'memebers JSON incorrect',
      });
      return;
    }
    foundProject.teamMembers = requestProject.teamMembers;
  }

  fs.writeFile('src/data/projects.json', JSON.stringify(projectsList), (err) => {
    if (err) {
      res.status(204).json({
        response: 'error',
        msg: 'can not write project file',
      });
    } else {
      res.status(200).json({
        response: 'ok',
        msg: '',
      });
    }
  });
});

module.exports = router;
