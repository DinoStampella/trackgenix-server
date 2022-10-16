import express from 'express';
import superAdminsControllers from '../controllers/super-admins';
import superAdminsValidations from '../validations/super-admins';

const router = express.Router();

router.get('/', superAdminsControllers.getAllSuperAdmins);
router.get('/:id', superAdminsControllers.getSuperAdminsById);
router.post('/', superAdminsValidations.validationsSuperAdmins, superAdminsControllers.createSuperAdmins);

export default router;
