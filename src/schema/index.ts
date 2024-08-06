import * as z from "zod";
import validator from "validator";
const MAX_UPLOAD_SIZE = 500 * 1024; // 500kb

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
    role: z.string().min(3, {
      message: "Please enter your role",
    }),
    image: z
      .instanceof(File)
      .nullable()
      .refine((file) => {
        return !file || file.size <= MAX_UPLOAD_SIZE;
      }, "File size must be less than 3MB"),
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

export const ForgetPasswordSchema = z
.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
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


export const AddTeamSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter the name for team",
  }),
  budget: z.union([
    z.number().int(),
    z.number().refine((val) => Number.isFinite(val) && !Number.isInteger(val), {
      message: "Value must be a finite float",
    }),
  ]),
});

export const BidPlayerSchema = z.object({
  value: z
    .number()
    .min(5000, { message: "Please fill out this field with value at least 5000" }),
  team: z.string().min(1, {
    message: "Please select the team",
  }),
});
