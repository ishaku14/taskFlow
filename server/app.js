const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const authRoute = require("./routes/auth.routes");
const taskRoute = require("./routes/task.routes");

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/task", taskRoute);

module.exports = app;