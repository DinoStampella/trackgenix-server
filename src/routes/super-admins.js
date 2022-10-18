import express from 'express';
import superAdminsControllers from '../controllers/super-admins';
import superAdminsValidations from '../validations/user';

const router = express.Router();

router.get('/', superAdminsControllers.getAllSuperAdmins);
router.get('/:id', superAdminsControllers.getSuperAdminsById);
router.post('/', superAdminsValidations.validateCreation, superAdminsControllers.createSuperAdmins);

export default router;
