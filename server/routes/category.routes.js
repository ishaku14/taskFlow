const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const verifyToken = require("../middleware/verify.token");

router.use(verifyToken);

router.get("/", categoryController.getAllCategories);
router.post("/", categoryController.createCategory);
router.patch("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;