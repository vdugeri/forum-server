import createReply from "./create.action";

const replyRoutes = router => {
  router.post("/replies", createReply);
};

export default replyRoutes;
