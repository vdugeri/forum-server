import User from "../../models/user.model";
import { generateToken } from "../../utils/tokens";

const signUp = async (req, res) => {
  const { password, firstName, lastName, emailAddress } = req.body;
  try {
    const user = new User({
      password,
      firstName,
      lastName,
      emailAddress
    });
    const error = user.validateSync();
    if (error) {
      return res.status(400).json({
        status: "error",
        error: error.errors
      });
    }

    await user.save();
    const userWithToken = await generateToken(user);
    return res.status(201).json({
      status: "success",
      user: userWithToken
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: error.message
    });
  }
};

export default signUp;
