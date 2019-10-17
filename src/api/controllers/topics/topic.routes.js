import createTopic from "./create.action";
import getAllTopics from "./getAll.action";
import getTopicPosts from "../posts/topic-posts.action";

const topicRoutes = router => {
  router.post("/topics", createTopic);
  router.get("/topics", getAllTopics);
  router.get("/topics/:topicId/posts", getTopicPosts);
};

export default topicRoutes;
