import TopicModel from "./topic.model";

class TopicDao {
  static async allTopics() {
    try {
      const topics = await TopicModel.find().populate("post");
      return topics;
    } catch (error) {
      const httpError = new Error(error.message);
      httpError.code = 500;

      throw httpError;
    }
  }

  static async createTopic(topicDTO) {
    try {
      const topic = new TopicModel(topicDTO);
      const error = topic.validateSync();

      if (error) {
        const httpError = new Error(error.message);
        httpError.code = 400;

        throw httpError;
      }
      await topic.save();

      return topic;
    } catch (error) {
      const httpError = new Error(error.message);
      httpError.code = error.code || 500;

      throw httpError;
    }
  }

  static async getTopicById(topicId) {
    try {
      const topic = await TopicModel.findById(topicId);
      if (!topic) {
        const httpError = new Error("Topic not found");
        httpError.code = 404;

        throw error;
      }
    } catch (error) {
      const httpError = new Error(error.message);
      httpError.code = error.code || 500;

      throw error;
    }
  }
}

export default TopicDao;
