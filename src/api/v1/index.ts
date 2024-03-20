import { Router } from "express";
import studentRoutes from "./routes/studentRoute";

const router = Router();

// v1 routes
router.use("/v1/student", studentRoutes);

export default router;
