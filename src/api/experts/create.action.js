import ExpertsDao from "api/experts/experts.dao";
import { generateToken } from "api/utils/tokens";

const createExpert = async (req, res) => {
  const { email, password, name, designation } = req.body;
  try {
    const expert = await ExpertsDao.createExpert({
      email,
      password,
      name,
      designation
    });

    if (expert) {
      expertWithToken = await generateToken(expert);
      return res.status(201).json({
        expert: expertWithToken
      });
    }
    return res.status(400).json({
      message: "invalid request body"
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default createExpert;
