const serverless = require("serverless-http");
const express = require("express");
const app = express();
const clients = require("./db/clients");

app.get("/", async (req, res, next) => {
  const db = await clients.getDbClient();
  const results = await db`select now();`;

  return res.status(200).json({
    message: "Hello from root!",
    results: results,
  });
});

app.get("/path", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
