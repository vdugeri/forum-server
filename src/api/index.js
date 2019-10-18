import express from "express";

const router = express.Router();

import authRoutes from "./auth/auth.routes";
import userRoutes from "./users/user.routes";
import postRoutes from "./posts/post.routes";
import topicRoutes from "./topics/topic.routes";
import replyRoutes from "./replies/reply.routes";

authRoutes(router);
userRoutes(router);
postRoutes(router);
topicRoutes(router);
replyRoutes(router);

export default router;
