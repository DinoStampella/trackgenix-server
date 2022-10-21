import express from 'express';
import superAdminsControllers from '../controllers/super-admins';
import superAdminsValidations from '../validations/user';

const router = express.Router();

router
  .get('/', superAdminsControllers.getAllSuperAdmins)
  .get('/:id', superAdminsControllers.getSuperAdminsById)
  .post('/', superAdminsValidations.validateCreation, superAdminsControllers.createSuperAdmins)
  .put('/:id', superAdminsValidations.validateCreation, superAdminsControllers.updateSuperAdmins)
  .delete('/:id', superAdminsControllers.deletedSuperAdmins)

export default router;
