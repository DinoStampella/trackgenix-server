import Admins from '../models/Admins';

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Admins.findByIdAndDelete(id);

    return res.status(204).json({
      message: `Admin with id ${id} deleted.`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

export default {
  deleteAdmin,
};
