import express from 'express';
import superAdminsControllers from '../controllers/super-admins';
import userValidations from '../validations/user';

const router = express.Router();

router
  .put('/:id', userValidations.validateCreation, superAdminsControllers.updateSuperAdmins)
  .delete('/:id', superAdminsControllers.deletedSuperAdmins);

export default router;
