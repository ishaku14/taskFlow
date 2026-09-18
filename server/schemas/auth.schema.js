const { z, email } = require("zod");

const registerSchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.string().trim().pipe(z.email()),
  password: z.string().trim().min(8).max(50)
});

const loginSchema = z.object({
  email: z.string().trim().pipe(email()),
  password: z.string().trim().min(1).max(50)
});

module.exports = {
  registerSchema,
  loginSchema,
}