import express from "express";

const router = express.Router();

import authRoutes from "../controllers/auth/auth.routes";
import userRoutes from "../controllers/users/user.routes";
import postRoutes from "../controllers/posts/post.routes";
import topicRoutes from "../controllers/topics/topic.routes";
import replyRoutes from "../controllers/replies/reply.routes";

authRoutes(router);
userRoutes(router);
postRoutes(router);
topicRoutes(router);
replyRoutes(router);

export default router;
