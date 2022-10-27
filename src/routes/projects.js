import express from 'express';
import {
  getAllProjects, getProjectById, createProject, updateProject, deleteProject,
} from '../controllers/projects';
import validateProject from '../validations/projects';

const router = express.Router();

router
  .get('/', getAllProjects)
  .get('/:id', getProjectById)
  .post('/', validateProject, createProject)
  .put('/:id', validateProject, updateProject)
  .delete('/:id', deleteProject);

export default router;
