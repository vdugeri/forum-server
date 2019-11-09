import ExpertsDao from "api/experts/experts.dao";
import { generateToken } from "api/utils/tokens";
import formatDBErrors from "api/utils/transform-error";

const createExpert = async (req, res) => {
  const { emailAddress, password, name, designation } = req.body;
  try {
    const expert = await ExpertsDao.createExpert({
      emailAddress,
      password,
      name,
      designation
    });

    if (expert) {
      const expertWithToken = await generateToken(expert);
      return res.status(201).json(expertWithToken);
    }
    return res.status(400).json({
      message: "invalid request body"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(formatDBErrors(error));
  }
};

export default createExpert;
