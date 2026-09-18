const { z } = require("zod");

const createTaskSchema = z.object({
  title: z.string().trim().min(2).max(200),
  description: z.string().trim().min(1).optional(),
  dueDate: z.date(),
  status: z.enum(["PENDING", "ONGOING", "COMPLETED"]).default("PENDING"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
  categoryId: z.coerce.number().int().positive().optional(),
});

const updateTaskSchema = z.object({
  taskId: z.coerce.number().int().positive(),
  title: z.string().trim().min(1).max(200).optional(),
  description: z.string().trim().min(1).optional(),
  dueDate: z.coerce.date().optional(),
  status: z.enum(["PENDING", "ONGOING", "COMPLETED"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional()
})

module.exports = {
  createTaskSchema,
  updateTaskSchema
}