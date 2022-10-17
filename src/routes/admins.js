import express from 'express';
import adminControllers from '../controllers/admins';
import adminValidations from '../validations/admins';

const router = express.Router();

router.delete('/:id', adminControllers.deleteAdmin);
router.put('/:id', adminValidations.validateCreation, adminControllers.modifyAdmin);

export default router;
