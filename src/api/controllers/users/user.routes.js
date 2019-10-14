import getUser from "./get.action";

const userRoutes = router => {
  router.get("/users/:id", getUser);
};

export default userRoutes;
