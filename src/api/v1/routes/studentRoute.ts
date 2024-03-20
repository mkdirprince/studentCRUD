/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  getAllStudentController,
  getStudent,
  updateStudent,
  createStudent,
  deleteStudent,
} from "../controllers/studentController";
import { Router } from "express";

const router = Router();

// student routes
router.get("/", getAllStudentController);
router.get("/:id", getStudent);
router.put("/:id", updateStudent);
router.post("/", createStudent);
router.delete("/:id", deleteStudent);

export default router;
