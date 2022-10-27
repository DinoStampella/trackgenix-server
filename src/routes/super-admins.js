import express from 'express';
import {
  getAllSuperAdmins, getSuperAdminsById, createSuperAdmins, updateSuperAdmins, deletedSuperAdmins,
} from '../controllers/super-admins';
import validateUser from '../validations/user';

const router = express.Router();

router
  .get('/', getAllSuperAdmins)
  .get('/:id', getSuperAdminsById)
  .post('/', validateUser, createSuperAdmins)
  .put('/:id', validateUser, updateSuperAdmins)
  .delete('/:id', deletedSuperAdmins);

export default router;
