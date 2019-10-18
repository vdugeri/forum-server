import UserModel from "./user.model";

class UserDao {
  static async getUser(id) {
    try {
      const user = await UserModel.findById(id);
      if (!user) {
        const httpError = new Error("User not found");
        httpError.code = 404;

        throw error;
      }

      return user;
    } catch (error) {
      const httpError = new Error(error.message);
      httpError.code = error.code || 500;

      throw httpError;
    }
  }

  static async signUp(userDTO) {
    try {
      const user = new UserModel(userDTO);
      const error = user.validateSync();
      if (error) {
        const httpError = new Error(error.message);
        httpError.code = 400;

        throw error;
      }
      await user.save();
      return user;
    } catch (error) {
      const httpError = new Error(error.message);
      httpError.code = error.code || 500;

      throw error;
    }
  }

  static async login(userCreds) {
    try {
      const { emailAddress, password } = userCreds;
      const user = await UserModel.findOne({
        emailAddress: { $eq: emailAddress }
      });

      if (user) {
        const match = await user.comparePasswords(password, user.password);

        if (match) {
          return user;
        }
      }

      return null;
    } catch (error) {
      const httpError = new Error(error.message);
      httpError.code = 500;

      throw error;
    }
  }
}

export default UserDao;
