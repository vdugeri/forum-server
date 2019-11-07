import TopicModel from "api/topics/topic.model";
import PostDao from "api/posts/posts.dao";

class TopicDao {
  static async allTopics() {
    try {
      let topics = await TopicModel.find();
      topics = await Promise.all(
        topics.map(async topic => {
          const posts = await PostDao.postsByTopic(topic._id);
          return { ...topic.toJSON(), posts };
        })
      );

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
