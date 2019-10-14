import login from "./login.action";
import signUp from "./signup.action";

const authRoutes = router => {
  router.post("/auth/login", login);
  router.post("/auth/signup", signUp);
};

export default authRoutes;
