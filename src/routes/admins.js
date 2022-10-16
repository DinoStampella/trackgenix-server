import express from 'express';
import adminValidations from '../validations/admins';
import adminControllers from '../controllers/admins';

const router = express.Router();

router.get('/', adminControllers.getAllAdmins);
router.get('/:id', adminControllers.getAdminById);
router.post('/', adminValidations.validateCreation, adminControllers.createAdmin);

export default router;
