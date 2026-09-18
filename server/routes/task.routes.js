const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify.token");
const taskController = require("../controllers/task.controller");
const { idParamSchema } = require("../schemas/common.schema");
const { createTaskSchema, updateTaskSchema } = require("../schemas/task.schema");
const { validate, validateParams } = require("../middleware/validate");


router.use(verifyToken);

router.get("/", taskController.getAllTasks);
router.post("/", validate(createTaskSchema), taskController.createTask);
router.patch("/:id", validateParams(idParamSchema), validate(updateTaskSchema), taskController.updateTask);
router.get("/:id", validateParams(idParamSchema), taskController.getTaskById);
router.patch("/:id", validateParams(idParamSchema), taskController.updateTaskStatus);
router.delete("/:id", validateParams(idParamSchema), taskController.deleteTask);

module.exports = router;