import mongoose from "mongoose";
import Admin from "../../models/admin.model";
import AdminRole from "../../models/adminRole.model";

const assignRole = async (req, res) => {
  const { id } = req.params;
  const { roleId } = req.body;
  try {
    const admin = await Admin.findById(mongoose.Types.ObjectId(id));
    if (!admin) {
      return res.status(404).json({
        status: "error",
        error: "Invalid admin id"
      });
    }
    const adminRole = new AdminRole({
      user: id,
      role: roleId
    });
    await adminRole.save();
    return res.status(201).json({
      status: "success",
      admin,
      adminRole
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: error.message
    });
  }
};

export default assignRole;
