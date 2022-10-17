import express from 'express';
import superAdminsControllers from '../controllers/super-admins';
import superAdminsValidations from '../validations/super-admins';

const router = express.Router();


router
    .delete('/:id', superAdminsControllers.deleteSuperAdmins)
    .put('/:id', superAdminsControllers.editSuperAdmins);

export default router;
