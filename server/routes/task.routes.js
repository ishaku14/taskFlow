const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");

router.get("/", taskController.getAllTasks);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.get("/:id", taskController.getTaskById);
router.patch("/:id", taskController.updateTaskStatus);
router.delete("/:id", taskController.deleteTask);

module.exports = router;