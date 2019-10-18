import getUser from "./get.action";
import getUserPosts from "../posts/user-posts.action";

const userRoutes = router => {
  router.get("/users/:id", getUser);
  router.get("/users/:userId/posts", getUserPosts);
};

export default userRoutes;
