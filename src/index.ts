import config from "./utils/config";
import express from "express";
import cors from "cors";
import healthcheck from "./api/healthCheck";
import morgan from "morgan";
import { unknownEndpoint } from "./middleware/unknowEndpoint";
import v1Api from "./api/v1/index";

export const app = express();
app.use(express.json());
app.use(cors());

app.use(morgan("dev"));

app.use("/healthcheck", healthcheck);
app.use("/api", v1Api);

app.use(unknownEndpoint);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
