import UserDao from "api/users/user.dao";
import { generateToken } from "api/utils/tokens";

const updateUser = async (req, res) => {
  const { id } = req.params;
  const userDTO = req.body;
  try {
    const user = await UserDao.update(id, userDTO);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userWithToken = await generateToken(user);
    return res.status(200).json(userWithToken);
  } catch (error) {
    throw error;
  }
};

export default updateUser;
