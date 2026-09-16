const prisma = require("../prisma/client");

exports.getAllCategories = async (userId) => {
  return prisma.category.findMany({
    where: { userId: parseInt(userId) },
    orderBy: { name: "asc" }
  });
}

exports.createCategory = async (userId, name) => {
  const trimmedName = name?.trim();

  if (!trimmedName) {
    const err = new Error("Category name is required");
    err.status = 400;
    throw err;
  }

  return prisma.category.create({
    data: {
      name: trimmedName,
      userId: parseInt(userId)
    }
  });
}

exports.updateCategory = async (userId, name, id) => {
  const categoryId = parseInt(id);

  if (isNaN(categoryId)) {
    const err = new Error("Invalid category ID");
    err.status = 400;
    throw err;
  }

  const trimmedName = name?.trim();

  if (!trimmedName) {
    const err = new Error("Category name is required");
    err.status = 400;
    throw err;
  }

  const category = await prisma.category.findUnique({
    where: { id: categoryId }
  });

  if (!category) {
    const err = new Error("Category not found");
    err.status = 404;
    throw err;
  }

  if (category.userId !== parseInt(userId)) {
    const err = new Error("Access denied");
    err.status = 403;
    throw err;
  }

  return prisma.category.update({
    where: { id: categoryId },
    data: { name: trimmedName }
  });
}

exports.deleteCategory = async (userId, id) => {
  const categoryId = parseInt(id);

  if (isNaN(categoryId)) {
    const err = new Error("Invalid category ID");
    err.status = 400;
    throw err;
  }

  const category = await prisma.category.findUnique({
    where: { id: categoryId }
  });

  if (!category) {
    const err = new Error("Category not found");
    err.status = 404;
    throw err;
  }

  if (category.userId !== parseInt(userId)) {
    const err = new Error("Access denied");
    err.status = 403;
    throw err;
  }

  return prisma.category.delete({
    where: { id: categoryId }
  });
}