import { z } from "zod";

const email = z.string().trim().pipe(z.email())

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(200),
  email: email,
  password: z.string().trim().min(8, "Password must be at least 8 characters").max(50),
  confirmPassword: z.string().trim().min(8, "Confirm Password must be at least 8 characters").max(50)
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"]
})

export const loginSchema = z.object({
  email: email,
  password: z.string().trim().min(1, "Password is required").max(50)
});
