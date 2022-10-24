import express from 'express';
import adminControllers from '../controllers/admins';
import userValidations from '../validations/user';

const router = express.Router();

router.get('/', adminControllers.getAllAdmins);
router.get('/:id', adminControllers.getAdminById);
router.post('/', userValidations.validateCreation, adminControllers.createAdmin);
router.delete('/:id', adminControllers.deleteAdmin);
router.put('/:id', userValidations.validateCreation, adminControllers.updateAdmin);

export default router;
