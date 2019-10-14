import createAdmin from "./create.action";
import getAllAdmins from "./getAll.action";
import getAdmin from "./get.action";
import assignRole from "./assignRole.action";

const adminUserRoutes = router => {
  router.post("/users", createAdmin);
  router.get("/users", getAllAdmins);
  router.get("/users/:id", getAdmin);
  router.post("/users/roles/:id", assignRole);
};

export default adminUserRoutes;
