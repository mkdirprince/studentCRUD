import studentServices from "../../../services/studentServices";
import { Request, Response } from "express";
import { newStudentSchema } from "../../../model/studentSchema";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const getAllStudentController = async (_req: Request, res: Response) => {
  try {
    const students = await studentServices.getAllStudents();
    return res.status(200).json(students);
  } catch (error) {
    let errorMessage = "Failed to fetch students. ";

    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }

    return res.status(500).send(errorMessage);
  }
};

export const getStudent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).send({ error: "Invalid ID provided" });
    }

    const student = await studentServices.getStudent(id);

    if (!student) {
      return res
        .status(404)
        .send({ error: "No student found with the provided ID" });
    }

    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

export const createStudent = async (req: Request, res: Response) => {
  try {
    const newStudent = await newStudentSchema.parseAsync(req.body);

    const savedStudent = await studentServices.createStudent(newStudent);

    return res.status(201).json(savedStudent);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send(error);
    }

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(400).send({ error: "Email already exists" });
      }
    }

    return res.status(500).send({ error });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const body = await newStudentSchema.parseAsync(req.body);

    const updatedStudent = await studentServices.updateStudent(id, body);

    return res.json(updatedStudent);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send(error);
    }

    return res.status(500).send({ error });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const student = await studentServices.getStudent(id);

    if (!student) {
      return res
        .status(404)
        .send({ error: "No student found with provided ID" });
    }

    await studentServices.removeStudent(id);

    return res.status(204).send({ message: "Student deleted" });
  } catch (error) {
    return res.status(500).send({ error });
  }
};
