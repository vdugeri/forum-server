import login from "api/auth/login.action";
import signUp from "api/auth/signup.action";

const authRoutes = router => {
  router.post("/auth/login", login);
  router.post("/auth/signup", signUp);
};

export default authRoutes;
