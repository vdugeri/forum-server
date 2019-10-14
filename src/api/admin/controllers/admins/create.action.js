import Admin from "../../models/admin.model";

const createAdmin = async (req, res) => {
  const { username, password, emailAddress } = req.body;
  try {
    let admin = new Admin({ username, password, emailAddress });
    const error = admin.validateSync();
    if (error && error.errors) {
      return res.status(400).json({
        status: "error",
        error: error.errors
      });
    }
    await admin.save();
    return res.status(201).json({
      status: "success",
      admin
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: error.message
    });
  }
};

export default createAdmin;
