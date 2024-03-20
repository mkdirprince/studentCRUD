import { prisma } from "../utils/db";
import { NewStudentEntry, StudentEntry } from "../types/types";
import { newStudentSchema } from "../model/studentSchema";
import { ZodError } from "zod";

//  Get all students in the database
const getAllStudents = async (): Promise<StudentEntry[]> => {
  try {
    const studenEntries = await prisma.student.findMany();

    return studenEntries;
  } catch (error: unknown) {
    throw new Error("Failed to fetch all students");
  }
};

// Getting a single student
const getStudent = async (id: number): Promise<StudentEntry | null> => {
  try {
    const student = await prisma.student.findUnique({
      where: {
        id: id,
      },
    });

    return student;
  } catch (error: unknown) {
    throw new Error(`Failed to fetch student with iD ${id}`);
  }
};

// Creating a new student
const createStudent = async (entry: NewStudentEntry): Promise<StudentEntry> => {
  try {
    const parsedStudent = newStudentSchema.parse(entry);

    const newStudnet = await prisma.student.create({
      data: parsedStudent,
    });

    return newStudnet;
  } catch (error: unknown) {
    let errorMessage = `Failed to create student. `;

    // Check if the error is an instance of ZodError
    if (error instanceof ZodError) {
      errorMessage += "Validation failed: " + error.message;
    } else {
      // Otherwise, use a generic error message
      errorMessage += "An unexpected error occurred.";
    }

    throw new Error(errorMessage);
  }
};

// updating a student in the database

const updateStudent = async (
  id: number,
  entryToUpdate: NewStudentEntry
): Promise<StudentEntry> => {
  try {
    const parsedStudent = newStudentSchema.parse(entryToUpdate);

    const updateStudent = await prisma.student.update({
      where: {
        id: id,
      },
      data: parsedStudent,
    });

    return updateStudent;
  } catch (error: unknown) {
    let errorMessage = "Failed to update student. ";

    if (error instanceof ZodError) {
      errorMessage += "Validation failed: " + error.message;
    } else {
      errorMessage += "An unexpected error occured.";
    }

    throw new Error(errorMessage);
  }
};

// deleting a single student

const removeStudent = async (id: number) => {
  try {
    await prisma.student.delete({
      where: {
        id: id,
      },
    });
  } catch (error: unknown) {
    throw new Error(`Failed to delete student with ID ${id}`);
  }
};

export default {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  removeStudent,
};
