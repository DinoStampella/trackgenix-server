import express from 'express';
import projectsControllers from '../controllers/projects';
import projectsValidations from '../validations/projects';

const router = express.Router();

router
  .get('/', projectsControllers.getAllProjects)
  .get('/:id', projectsControllers.getProjectById)
  .post('/', projectsValidations.validateCreation, projectsControllers.createProject)
  .put('/:id', projectsValidations.validateCreation, projectsControllers.editProject)
  .delete('/:id', projectsControllers.deleteProject)

export default router;
