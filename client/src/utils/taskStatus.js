import dayjs from "dayjs";
export const STATUS_ORDER = ["PENDING", "IN_PROGRESS", "COMPLETED"];

export const STATUS_CONFIG = {
  PENDING: { label: "Pending", classes: "bg-gray-100 text-gray-600" },
  IN_PROGRESS: { label: "In progress", classes: "bg-blue-100 text-blue-700" },
  COMPLETED: { label: "Completed", classes: "bg-green-100 text-green-700" }
}

export function isOverdue(task) {
  if (task.status === "COMPLETED" || !task.dueDate) return false;
  return dayjs(task.dueDate).isBefore(dayjs(), "day");
}

export function isDueToday(task) {
  if (task.status === "COMPLETED" || !task.dueDate) return false;
  return dayjs(task.dueDate).isSame(dayjs(), "day");
}