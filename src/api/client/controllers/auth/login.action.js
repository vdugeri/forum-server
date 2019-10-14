import User from "../../models/user.model";
import { generateToken } from "../../../utils/tokens";

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: { $eq: username } });
    if (user) {
      const matched = await user.comparePasswords(password, user.password);

      if (matched) {
        const userWithToken = await generateToken(user);
        res.status(200).json({
          status: "success",
          user: userWithToken
        });
      } else {
        res.status(401).json({
          status: "error",
          error: "Invalid username or password"
        });
      }
    } else {
      return res.status(404).json({
        status: "error",
        error: "Invalid username or password"
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message
    });
  }
};

export default login;
