import express from "express";

const router = express.Router();

import adminUserRoutes from "../controllers/admins/users.routes";

adminUserRoutes(router);

export default router;
