import { Router } from "express";
import { prisma } from "../utils/db";

const router = Router();

router.get("/", (_req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "Ok",
    timestamp: Date.now(),
    database: {
      status: "OK",
      message: "",
    },
  };

  prisma.$queryRaw`SELECT 1`
    .then(() => {
      res.send(healthcheck);
    })
    .catch((error: unknown) => {
      let errorMessage = "Failed to connect to database. ";

      if (error instanceof Error) {
        errorMessage += "Error: " + error.message;
      }

      healthcheck.message = errorMessage;
      healthcheck.database.status = "Error";
      healthcheck.database.message = "Database connection failed";

      res.status(503).send(healthcheck);
    });
});

export default router;
