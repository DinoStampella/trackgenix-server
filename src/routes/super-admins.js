import express from 'express';
import superAdminsControllers from '../controllers/super-admins';
import superAdminsValidations from '../validations/user';

const router = express.Router();

router.get('/', superAdminsControllers.getAllSuperAdmins);
router.get('/:id', superAdminsControllers.getSuperAdminsById);
router.post('/', superAdminsValidations.validateCreation, superAdminsControllers.createSuperAdmins);
router.put('/:id', superAdminsValidations.validateCreation, superAdminsControllers.updateSuperAdmins);
router.delete('/:id', superAdminsControllers.deletedSuperAdmins);

export default router;
