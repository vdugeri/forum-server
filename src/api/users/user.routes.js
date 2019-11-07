import getUser from "api/users/get.action";
import getUserPosts from "api/users/user-posts.action";

const userRoutes = router => {
  router.get("/users/:id", getUser);
  router.get("/users/:userId/posts", getUserPosts);
};

export default userRoutes;
