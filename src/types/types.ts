import type { z } from "zod";
import { studentSchema, newStudentSchema } from "../model/studentSchema";

export type StudentEntry = z.infer<typeof studentSchema>;

export type NewStudentEntry = z.infer<typeof newStudentSchema>;
