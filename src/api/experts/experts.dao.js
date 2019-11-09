import ExpertModel from "./experts.model";

class ExpertsDao {
  static async createExpert(expertDTO) {
    try {
      console.log(expertDTO);
      const expert = new ExpertModel(expertDTO);
      const error = expert.validateSync();

      if (error) {
        throw error;
      }

      await expert.save();

      return expert;
    } catch (error) {
      throw error;
    }
  }

  static async authenticate({ email, password }) {
    try {
      const expert = await ExpertModel.findOne({
        emailAddress: { $eq: email }
      });

      if (expert) {
        const matched = await exppert.comparePasswords(password);

        return matched ? expert : null;
      }

      return null;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      const expert = await ExpertModel.findById(id);
      return expert;
    } catch (error) {
      throw error;
    }
  }
}

export default ExpertsDao;
