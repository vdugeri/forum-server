import UserDao from "../users/user.dao";
import { generateToken } from "../utils/tokens";

const signUp = async (req, res) => {
  const { password, firstName, lastName, emailAddress } = req.body;
  try {
    let user = await UserDao.signUp({
      password,
      firstName,
      lastName,
      emailAddress
    });
    user = await generateToken(user);
    return res.status(201).json({
      user
    });
  } catch (error) {
    return res.status(error.code).json({
      message: error.message
    });
  }
};

export default signUp;
