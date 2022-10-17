import express from 'express';
import superAdminsControllers from '../controllers/super-admins';
import superAdminsValidations from '../validations/super-admins';

const router = express.Router();

router
  .put('/:id', superAdminsValidations.validateCreation, superAdminsControllers.editSuperAdmins)
  .delete('/:id', superAdminsControllers.deleteSuperAdmins);

export default router;
