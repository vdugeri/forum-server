import ExpertsDao from "api/experts/experts.dao";
import { generateToken } from "api/utils/tokens";

const expertSignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const expert = await ExpertsDao.authenticate({ email, password });
    if (expert) {
      const expertWithToken = await generateToken(expert);
      return res.status(200).json({
        expert: expertWithToken
      });
    }
    return res.status(401).json({
      message: "Invalid username or password"
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

export default expertSignIn;
