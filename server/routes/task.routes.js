const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify.token");
const taskController = require("../controllers/task.controller");

router.use(verifyToken);

router.get("/", taskController.getAllTasks);
router.post("/", taskController.createTask);
router.patch("/:id", taskController.updateTask);
router.get("/:id", taskController.getTaskById);
router.patch("/:id", taskController.updateTaskStatus);
router.delete("/:id", taskController.deleteTask);

module.exports = router;