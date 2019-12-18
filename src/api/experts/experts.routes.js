import createExpert from "api/experts/create.action";
import getExpert from "api/experts/get.action";
import expertSignIn from "api/experts/signin.action";
import getAllExperts from "api/experts/all.action";

const expertsRoutes = router => {
  router.post("/experts", createExpert);
  router.get("/experts", getAllExperts);
  router.get("/experts/:expertId", getExpert);
  router.post("/experts/signin", expertSignIn);
};

export default expertsRoutes;
