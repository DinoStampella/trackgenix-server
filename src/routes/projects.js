import express from 'express';
import projectsControllers from '../controllers/projects';
import projectsValidations from '../validations/projects';

const router = express.Router();

router
  .delete('/:id', projectsControllers.deleteProject)
  .put(
    '/:id',
    projectsValidations.validateCreation,
    projectsControllers.editProject,
  );

export default router;
