import mongoose from "mongoose";
import User from "../../models/user.model";

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(mongoose.Types.ObjectId(id));
    if (user) {
      res.status(200).json({
        status: "success",
        data: user
      });
    } else {
      res.status(404).json({
        status: "notFound"
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message
    });
  }
};

export default getUser;
