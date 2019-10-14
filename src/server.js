// import "babel-polyfill";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import api from "./api/client/routes";
import adminApi from "./api/admin/routes";

const app = express();
app.set("port", process.env.PORT || 8081);
app.set("apiVersion", process.env.API_VERSION || "v1");
app.set("dbUrl", process.env.MONGO_URL);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`/api/${app.get("apiVersion")}`, api);
app.use(`/api/${app.get("apiVersion")}/admin`, adminApi);

app.use(morgan("dev"));

app.use((req, res) => {
  const err = new Error("Notfound");
  err.status = 404;

  res.json(err);
});

mongoose.set("useCreateIndex", true);
mongoose.connect(app.get("dbUrl"), { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));

db.once("open", () => {
  app.listen(app.get("port"), () => {
    console.log(`API server listening at port ${app.get("port")}`);
  });
});

export default app;
