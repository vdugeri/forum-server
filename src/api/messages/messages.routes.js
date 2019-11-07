import getUserMessages from "api/messages/get.action";
import sendMessage from "api/messages/create.action";

const messageRoutes = router => {
  router.get("/messages/:userId", getUserMessages);
  router.post("/messages", sendMessage);
};

export default messageRoutes;
