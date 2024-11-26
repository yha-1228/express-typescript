import express from "express";
import logger from "morgan";
import cors from "cors";
import corsOptions from "../config/corsOptions";
import { notFoundHandler } from "./middlewares/common/notFoundHandler";
import { errorLogHandler } from "./middlewares/common/errorLogHandler";
import { errorResponder } from "./middlewares/common/errorResponder";

const app: express.Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cors(corsOptions));

// API routes

app.use("/test", (req, res) => {
  res.status(200).send({ result: "ok" });
});

app.use(notFoundHandler);

// Handle error

app.use(errorLogHandler);
app.use(errorResponder);

export default app;
