import express from 'express';
import adminControllers from '../controllers/admins';
import userValidations from '../validations/user';

const router = express.Router();

router.delete('/:id', adminControllers.deleteAdmin);
router.put('/:id', userValidations.validateCreation, adminControllers.modifyAdmin);

export default router;
