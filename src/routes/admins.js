import express from 'express';
import userValidations from '../validations/user';
import adminControllers from '../controllers/admins';

const router = express.Router();

router.get('/', adminControllers.getAllAdmins);
router.get('/:id', adminControllers.getAdminById);
router.post('/', userValidations.validateCreation, adminControllers.createAdmin);

export default router;
