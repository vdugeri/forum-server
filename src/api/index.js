import express from "express";

const router = express.Router();

import authRoutes from "api/auth/auth.routes";
import userRoutes from "api/users/user.routes";
import postRoutes from "api/posts/post.routes";
import topicRoutes from "api/topics/topic.routes";
import replyRoutes from "api/replies/reply.routes";
import messageRoutes from "api/messages/messages.routes";

authRoutes(router);
userRoutes(router);
postRoutes(router);
topicRoutes(router);
replyRoutes(router);
messageRoutes(router);

export default router;
