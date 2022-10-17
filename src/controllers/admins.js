import Admins from '../models/Admins';

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Admins.findByIdAndDelete(id);
    if (result == null) {
      return res.status(400).json({
        message: `There is no admin with id ${id}`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Admin with id ${id} deleted.`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const modifyAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Admins.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );
    if (result == null) {
      return res.status(400).json({
        message: `There is no admin with id ${id}`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Admin with id ${id} modified.`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

export default {
  deleteAdmin,
  modifyAdmin,
};
