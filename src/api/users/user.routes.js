import getUser from "api/users/get.action";
import getUserPosts from "api/users/user-posts.action";
import updateUser from "api/users/update.action";

const userRoutes = router => {
  router.get("/users/:id", getUser);
  router.get("/users/:userId/posts", getUserPosts);
  router.put("/users/:id", updateUser);
};

export default userRoutes;
