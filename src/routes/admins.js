import express from 'express';
import {
  getAllAdmins, getAdminById, createAdmin, updateAdmin, deleteAdmin,
} from '../controllers/admins';
import validateUser from '../validations/user';
import checkAuth from '../middelwares/authMiddelware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN', 'ADMIN']), getAllAdmins)
  .get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), getAdminById)
  .post('/', checkAuth(['SUPER_ADMIN']), validateUser, createAdmin)
  .put('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), validateUser, updateAdmin)
  .delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), deleteAdmin);

export default router;
