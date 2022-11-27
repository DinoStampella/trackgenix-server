import express from 'express';
import {
  getAllProjects, getProjectById, createProject, updateProject, deleteProject,
} from '../controllers/projects';
import validateProject from '../validations/projects';
import checkAuth from '../middelwares/authMiddelware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getAllProjects)
  .get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getProjectById)
  .post('/', checkAuth(['SUPER_ADMIN', 'ADMIN']), validateProject, createProject)
  .put('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), validateProject, updateProject)
  .delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), deleteProject);

export default router;
