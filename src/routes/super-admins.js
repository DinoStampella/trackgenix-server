import express from 'express';
import superAdminsControllers from '../controllers/super-admins';
import userValidations from '../validations/user';

const router = express.Router();

router
  .put('/:id', userValidations.validateCreation, superAdminsControllers.editSuperAdmins)
  .delete('/:id', superAdminsControllers.deleteSuperAdmins);

export default router;
