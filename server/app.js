const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const authRoute = require("./routes/auth.routes");
const taskRoute = require("./routes/task.routes");
const categoryRoute = require("./routes/category.routes");
const notificationRoute = require("./routes/notification.routes");

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/task", taskRoute);
app.use("/api/category", categoryRoute);
app.use("/api/notification", notificationRoute);

module.exports = app;