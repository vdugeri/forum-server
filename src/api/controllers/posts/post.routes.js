import createPost from "./create.action";
import getPost from "./get.action";
import postReplies from "../replies/postReplies.action";

const postRoutes = router => {
  router.post("/posts", createPost);
  router.get("/posts/:id", getPost);
  router.get("/posts/:postId/replies", postReplies);
};

export default postRoutes;
