import superAdmins from '../models/Super-admins';
import isValidObjectId from '../utils/validateObjectId';
import firebase from '../helpers/firebase';

export const getAllSuperAdmins = async (req, res) => {
  try {
    const superAdmin = await superAdmins.find();
    if (!superAdmin.length) {
      return res.status(404).json({
        message: 'Super admins not found',
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Super Admins found',
      data: superAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Unexpected error ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export const getSuperAdminsById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: `Invalid id: ${id}`,
        error: true,
      });
    }
    const superAdminFound = await superAdmins.findById(id);
    if (!superAdminFound) {
      return res.status(404).json({
        message: `Couldn't find super admin with id ${id}`,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Found super admin with id ${id}`,
      data: superAdminFound,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Unexpected error ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export const createSuperAdmins = async (req, res) => {
  try {
    const newFirebaseUser = await firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    await firebase.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'SUPER_ADMIN' });

    const newSuperAdmin = await superAdmins.create(
      { ...req.body, firebaseUid: newFirebaseUser.uid },
    );

    const newSuperAdminSaved = await newSuperAdmin.save();
    return res.status(201).json({
      message: 'Super admins created successfully',
      data: newSuperAdminSaved,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Unexpected error ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export const updateSuperAdmins = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: `Invalid id: ${req.params.id}`,
        error: true,
      });
    }
    const updatedSuperAdmin = await superAdmins.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );
    if (updatedSuperAdmin == null) {
      return res.status(404).json({
        message: `Couldn't find super admin with id ${id}`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Modified super admin with id ${id}`,
      data: updatedSuperAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Unexpected error ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export const deletedSuperAdmins = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: `Invalid id: ${req.params.id}`,
        error: true,
      });
    }
    const deletedSuperAdmin = await superAdmins.findByIdAndDelete(id);
    if (!deletedSuperAdmin) {
      return res.status(404).json({
        message: `Couldn't find super admin with id ${id}`,
        error: true,
      });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: `Unexpected error ${error}`,
      data: undefined,
      error: true,
    });
  }
};
