import getUser from "api/users/get.action";
import getUserPosts from "api/users/user-posts.action";
import updateUser from "api/users/update.action";
import getAllUsers from "api/users/getAll.action";

const userRoutes = router => {
  router.get("/users/:id", getUser);
  router.get("/users/:userId/posts", getUserPosts);
  router.put("/users/:id", updateUser);
  router.get("/users", getAllUsers);
};

export default userRoutes;
