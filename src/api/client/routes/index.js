import express from "express";

const router = express.Router();

import authRoutes from "../controllers/auth/auth.routes";
import userRoutes from "../controllers/users/user.routes";

authRoutes(router);
userRoutes(router);

export default router;
