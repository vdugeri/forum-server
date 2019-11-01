import getUserMessages from "./get.action";
import sendMessage from "./create.action";

const messageRoutes = router => {
  router.get("/messages/:userId", getUserMessages);
  router.post("/messages", sendMessage);
};

export default messageRoutes;
