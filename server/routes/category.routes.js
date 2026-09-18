const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const verifyToken = require("../middleware/verify.token");
const { idParamSchema } = require("../schemas/common.schema");
const { createCategorySchema, updateCategorySchema } = require("../schemas/category.schema");
const { validate, validateParams } = require("../middleware/validate");

router.use(verifyToken);

router.get("/", categoryController.getAllCategories);
router.post("/", validate(createCategorySchema), categoryController.createCategory);
router.patch("/:id", validateParams(idParamSchema), validate(updateCategorySchema), categoryController.updateCategory);
router.delete("/:id", validateParams(idParamSchema), categoryController.deleteCategory);

module.exports = router;