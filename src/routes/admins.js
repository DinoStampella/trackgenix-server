import express from 'express';
import adminControllers from '../controllers/admins';

const router = express.Router();

router.delete('/:id', adminControllers.deleteAdmin);
router.put('/:id', adminControllers.modifyAdmin);

export default router;
