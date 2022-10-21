import express from 'express';
import adminControllers from '../controllers/admins';
import userValidations from '../validations/user';

const router = express.Router();

router
  .get('/', adminControllers.getAllAdmins)
  .get('/:id', adminControllers.getAdminById)
  .post('/', userValidations.validateCreation, adminControllers.createAdmin)
  .put('/:id', userValidations.validateCreation, adminControllers.modifyAdmin)
  .delete('/:id', adminControllers.deleteAdmin);

export default router;
