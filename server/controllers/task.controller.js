const taskServices = require("../services/task.service");

exports.getAllTasks = async (req, res) => {
  try {
    const userId = req.user.userId;
    const category = req.query.category;
    const tasks = await taskServices.getAllTasks(userId, category);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || "Internal server error: can't get tasks" });
  }
}

exports.createTask = async (req, res) => {
  try { 
    const userId = req.user.userId;
    const task = await taskServices.createTask(userId, req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || "Internal server error: can't create task" });
  }
}

exports.getTaskById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const taskId = req.params.id;
    const task = await taskServices.getTaskById(userId, taskId);
    res.status(200).json(task);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || "Error retrieving task" });
  }
}

exports.updateTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const taskId = req.params.id;
    const task = await taskServices.updateTask(userId, taskId, req.body);
    res.status(200).json(task);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || "Error updating task status" });
  }
}

exports.updateTaskStatus = async (req, res) => {
  try {
    const userId = req.user.userId;
    const taskId = req.params.id;
    const status = req.body.status;
    const taskStatus = await taskServices.updateTaskStatus(userId, taskId, status);
    res.status(200).json({taskStatus});
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || "Error updating task status" });
  }
}

exports.deleteTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const taskId = req.params.id;
    const deletedTask = await taskServices.deleteTask(userId, taskId);
    res.status(200).json(deletedTask)
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || "Error deleting task" });
  }
}