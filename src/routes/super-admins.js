import express from 'express';
import {
  getAllSuperAdmins, getSuperAdminsById, createSuperAdmins, updateSuperAdmins, deletedSuperAdmins,
} from '../controllers/super-admins';
import validateUser from '../validations/user';
import checkAuth from '../middelwares/authMiddelware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN']), getAllSuperAdmins)
  .get('/:id', checkAuth(['SUPER_ADMIN']), getSuperAdminsById)
  .post(
    '/',
    //  checkAuth(['SUPER_ADMIN']),
    validateUser,
    createSuperAdmins,
  )
  .put('/:id', checkAuth(['SUPER_ADMIN']), validateUser, updateSuperAdmins)
  .delete('/:id', checkAuth(['SUPER_ADMIN']), deletedSuperAdmins);

export default router;
