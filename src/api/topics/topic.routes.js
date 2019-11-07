import createTopic from "api/topics/create.action";
import getAllTopics from "api/topics/getAll.action";
import getTopicPosts from "api/posts/topic-posts.action";

const topicRoutes = router => {
  router.post("/topics", createTopic);
  router.get("/topics", getAllTopics);
  router.get("/topics/:topicId/posts", getTopicPosts);
};

export default topicRoutes;
