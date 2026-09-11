const prisma = require("../prisma/client");

exports.getAllTasks =async (category) => {
  // const where = category ? { category } : {};
  const where = {}
  if (category) where.category = category;
  return prisma.task.findMany({ where });
}

exports.createTask = async ({ title, description, priority, dueDate, category }) => {
  if (!title || !dueDate) {
    const err = new Error("Title and due date are required");
    err.status = 400;
    throw err;
  }

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        priority,
        userId: 1
      }
    });

    return task;
  } catch (err) {
    throw err;
  }
}

exports.getTaskById = async (taskId) => {
  if (!taskId) {
    const err = new Error("Invalid task ID");
    err.status = 400;
    throw err;
  }

  const task = await prisma.task.findUnique({
    where: { id: parseInt(taskId) }
  })
  
  if (!task) {
    const err = new Error("Task not found");
    err.status = 404;
    throw err;
  }
  return task;
}

exports.updateTask = async (taskId, { title, description, dueDate, priority, status, }) => {
  if (!taskId) {
    const err = new Error("Invalid task ID");
    err.status = 400;
    throw err;
  }

  let data = {}
  if (title !== undefined) data.title = title;
  if (description !== undefined) data.description = description;
  if (dueDate !== undefined) data.dueDate = new Date(dueDate);
  if (priority !== undefined) data.priority = priority;
  if (status !== undefined) data.status = status;

  return prisma.task.update({
    where: { id: parseInt(taskId) },
    data
  });
}

exports.updateTaskStatus = async (taskId, status) => {
  return prisma.task.update({
    where: { id: parseInt(taskId) },
    data: { status: status }
  });
}

exports.deleteTask = (taskId) => {
  return prisma.task.delete({
    where: { id: parseInt(taskId) }
  });
}