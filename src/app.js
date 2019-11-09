import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import api from "api";

const app = express();
app.set("apiVersion", process.env.API_VERSION || "v1");
app.set("dbUrl", process.env.MONGO_URL);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`/api/${app.get("apiVersion")}`, api);

function availableRoutes() {
  return app._router.stack
    .filter(r => r.route)
    .map(r => {
      return {
        method: Object.keys(r.route.methods)[0].toUpperCase(),
        path: r.route.path
      };
    });
}

app.use(morgan("dev"));

app.use((req, res) => {
  const err = new Error("Notfound");
  err.status = 404;

  res.json(err);
});

export default app;
