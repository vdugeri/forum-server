import User from "api/users/user.model";

const getAllUsers = async (req, res) => {
  const { admin } = req.query;

  let users = null;
  try {
    if (admin) {
      users = await User.find({ isAdmin: true });
    } else {
      users = await User.find();
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: error.message
    });
  }
};

export default getAllUsers;
