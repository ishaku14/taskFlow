const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");
const verifyToken = require("../middleware/verify.token");
const { idParamSchema } = require("../schemas/common.schema");
const { validateParams } = require("../middleware/validate");

router.use(verifyToken);

router.get("/", notificationController.getNotifications);
router.patch("/:id/read", validateParams(idParamSchema), notificationController.readNotification);
router.patch("/read-all", notificationController.readAllNotifications);

module.exports = router;