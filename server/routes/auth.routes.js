const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const verifyToken = require("../middleware/verify.token");
const { registerSchema, loginSchema } = require("../schemas/auth.schema");
const { validate } = require("../middleware/validate");

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", verifyToken, authController.logout);

module.exports = router;