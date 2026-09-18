const prisma = require("../prisma/client");

const ALLOWED_STATUSES = ["PENDING", "IN_PROGRESS", "COMPLETED"];

exports.getAllTasks = async (userId, category) => {
  const where = { userId: parseInt(userId) };
  if (category) where.category = category;

  return prisma.task.findMany({
    where,
    orderBy: { dueDate: "asc" }
  });
}

exports.createTask = async (userId, { title, description, priority, dueDate, category }) => {
  if (!title || !dueDate) {
    const err = new Error("Title and due date are required");
    err.status = 400;
    throw err;
  }

  if (!userId) {
    const err = new Error("No user ID provided");
    err.status = 400;
    throw err;
  }

  return prisma.task.create({
    data: {
      title,
      description,
      dueDate: new Date(dueDate),
      priority,
      category,
      userId: parseInt(userId)
    }
  });
}

exports.getTaskById = async (userId, id) => {
  const taskId = parseInt(id);

  if (isNaN(id)) {
    const err = new Error("Invalid task ID");
    err.status = 400;
    throw err;
  }

  const task = await prisma.task.findUnique({
    where: { taskId }
  });

  if (!task) {
    const err = new Error("Task not found");
    err.status = 404;
    throw err;
  }

  if (task.userId !== parseInt(userId)) {
    const err = new Error("Access denied");
    err.status = 403;
    throw err;
  }

  return task;
}

exports.updateTask = async (userId, id, { title, description, dueDate, priority, status }) => {
  const taskId = parseInt(id);

  if (isNaN(taskId)) {
    const err = new Error("Invalid task ID");
    err.status = 400;
    throw err;
  }

  const task = await prisma.task.findUnique({ where: { taskId } });

  if (!task) {
    const err = new Error("Task not found");
    err.status = 404;
    throw err;
  }

  if (task.userId !== parseInt(userId)) {
    const err = new Error("Access denied");
    err.status = 403;
    throw err;
  }

  if (status !== undefined && !ALLOWED_STATUSES.includes(status)) {
    const err = new Error(`Status must be one of: ${ALLOWED_STATUSES.join(", ")}`);
    err.status = 400;
    throw err;
  }

  const data = {};
  if (title !== undefined) data.title = title;
  if (description !== undefined) data.description = description;
  if (dueDate !== undefined) data.dueDate = new Date(dueDate);
  if (priority !== undefined) data.priority = priority;
  if (status !== undefined) data.status = status;

  return prisma.task.update({
    where: { taskId },
    data
  });
}

exports.updateTaskStatus = async (userId, taskId, status) => {
  const id = parseInt(taskId);

  if (isNaN(id)) {
    const err = new Error("Invalid task ID");
    err.status = 400;
    throw err;
  }

  if (!ALLOWED_STATUSES.includes(status)) {
    const err = new Error(`Status must be one of: ${ALLOWED_STATUSES.join(", ")}`);
    err.status = 400;
    throw err;
  }

  const task = await prisma.task.findUnique({ where: { id } });

  if (!task) {
    const err = new Error("Task not found");
    err.status = 404;
    throw err;
  }

  if (task.userId !== parseInt(userId)) {
    const err = new Error("Access denied");
    err.status = 403;
    throw err;
  }

  return prisma.task.update({
    where: { id },
    data: { status }
  });
}

exports.deleteTask = async (userId, taskId) => {
  const id = parseInt(taskId);

  if (isNaN(id)) {
    const err = new Error("Invalid task ID");
    err.status = 400;
    throw err;
  }

  const task = await prisma.task.findUnique({ where: { id } });

  if (!task) {
    const err = new Error("Task not found");
    err.status = 404;
    throw err;
  }

  if (task.userId !== parseInt(userId)) {
    const err = new Error("Access denied");
    err.status = 403;
    throw err;
  }

  return prisma.task.delete({ where: { id } });
}