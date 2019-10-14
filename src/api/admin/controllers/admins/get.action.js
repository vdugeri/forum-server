import mongoose from "mongoose";
import Admin from "../../models/admin.model";

const getAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findById(mongoose.Types.ObjectId(id));
    if (admin) {
      return res.status(200).json({
        status: "success",
        admin
      });
    }

    return res.status(404).json({
      status: "error",
      error: "Invlaid admin id"
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: error.message
    });
  }
};

export default getAdmin;
