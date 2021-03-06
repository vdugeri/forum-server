import createPost from "api/posts/create.action";
import getPost from "api/posts/get.action";
import postReplies from "api/replies/postReplies.action";
import getAllPosts from "api/posts/getAll.action";
import deletePost from "api/posts/delete.action";

const postRoutes = router => {
  router.post("/posts", createPost);
  router.get("/posts", getAllPosts);
  router.get("/posts/:postId", getPost);
  router.get("/posts/:postId/replies", postReplies);
  router.delete("/posts/:id", deletePost);
};

export default postRoutes;
