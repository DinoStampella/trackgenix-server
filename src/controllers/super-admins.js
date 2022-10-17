import superAdmins from '../models/Super-admins';

const deleteSuperAdmins = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await superAdmins.findByIdAndDelete(id);
    return res.status(200).json({
      message: 'Super admin deleted',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: 'Id non-existent',
      data: undefined,
      error: true,
    });
  }
};

const editSuperAdmins = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await superAdmins.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );

    return res.status(200).json({
      message: 'Super admin edited',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Super admin cannot be edited',
      data: undefined,
      error: true,
    });
  }
};

export default {
  deleteSuperAdmins,
  editSuperAdmins,
};
