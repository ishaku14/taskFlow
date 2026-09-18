const { z } = require("zod");

const createCategorySchema = z.object({
  name: z.string().trim().min(2).max(50)
});

const updateCategorySchema = z.object({
  name: z.string().trim().min(2).max(50).optional(),
  id: z.coerce.number().int().positive()
});

module.exports = {
  createCategorySchema,
  updateCategorySchema
}