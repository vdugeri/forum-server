import { generateToken } from "../utils/tokens";

const login = async (req, res) => {
  const { emailAddress, password } = req.body;
  try {
    const user = UserDao.login({ emailAddress, password });
    if (user) {
      const userWithToken = await generateToken(user);
      res.status(200).json({
        user: userWithToken
      });
    } else {
      return res.status(401).json({
        message: "Invalid username or password"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export default login;
