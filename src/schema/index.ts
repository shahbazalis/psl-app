import * as z from "zod";
import validator from "validator";

export const RegisterSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    name: z.string().min(1, {
      message: "Please enter your name",
    }),
    phoneNumber: z
      .string()
      .min(10, {
        message: "Please enter your phone number",
      })
      .transform((val) => val.replaceAll(" ", ""))
      .refine(
        (val) => validator.isMobilePhone(val),
        "Enter a valid phone number"
      ),
    nationality: z.string().min(3, {
      message: "Please enter your nationality",
    }),
    role: z.enum(["BATTER", "BOWLER", "ALLROUNDER"],{ message:"Role is required"}),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});