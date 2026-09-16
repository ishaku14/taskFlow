const prisma = require("../prisma/client");

exports.getNotifications = async (userId, page = 1, limit = 20) => {
  const skip = (page - 1) * limit;

  return prisma.notification.findMany({
    where: { userId: parseInt(userId) },
    orderBy: { createdAt: "desc" },
    skip,
    take: limit
  });
}

exports.readNotification = async (id, userId) => {
  const notificationId = parseInt(id);

  if (isNaN(notificationId)) {
    const err = new Error("Invalid notification ID");
    err.status = 400;
    throw err;
  }

  const notification = await prisma.notification.findUnique({
    where: { id: notificationId }
  });

  if (!notification) {
    const err = new Error("Notification not found");
    err.status = 404;
    throw err;
  }

  if (notification.userId !== parseInt(userId)) {
    const err = new Error("Access denied");
    err.status = 403;
    throw err;
  }

  return prisma.notification.update({
    where: { id: notificationId },
    data: { isRead: true }
  });
}

exports.readAllNotifications = async (userId) => {
  return prisma.notification.updateMany({
    where: { userId: parseInt(userId) },
    data: { isRead: true }
  });
}