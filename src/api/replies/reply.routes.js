import createReply from "api/replies/create.action";

const replyRoutes = router => {
  router.post("/replies", createReply);
};

export default replyRoutes;
