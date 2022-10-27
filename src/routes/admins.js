import express from 'express';
import {
  getAllAdmins, getAdminById, createAdmin, updateAdmin, deleteAdmin,
} from '../controllers/admins';
import validateUser from '../validations/user';

const router = express.Router();

router
  .get('/', getAllAdmins)
  .get('/:id', getAdminById)
  .post('/', validateUser, createAdmin)
  .put('/:id', validateUser, updateAdmin)
  .delete('/:id', deleteAdmin);

export default router;
