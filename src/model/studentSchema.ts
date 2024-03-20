import { z } from "zod";

export const studentSchema = z.object({
  id: z.number(),
  firstName: z.string({
    required_error: "First name is required",
    invalid_type_error: "First name must be a string",
  }),
  lastName: z.string({
    required_error: "Last name is required",
    invalid_type_error: "Last name must be a string",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email address",
    }),
});

export const newStudentSchema = studentSchema.omit({
  id: true,
});
