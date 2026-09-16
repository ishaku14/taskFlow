require("dotenv").config();
const http = require("http");
const app = require("./app");
const cron = require("node-cron");
const cleanupExpiredTokens = require("./jobs/cleanupExpiredTokens");

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

cron.schedule("30 10 * * *", cleanupExpiredTokens);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})