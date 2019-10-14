import Admin from "../../models/admin.model";

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    return res.status(200).json({
      status: "success",
      admins
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: error.message
    });
  }
};

export default getAllAdmins;
