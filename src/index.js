const serverless = require("serverless-http");
const express = require("express");
const app = express();
const clients = require("./db/clients");
const { createCar, getCars } = require("./db/crud");

app.use(express.json());

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

app.post("/car", async (req, res, next) => {
  try {
    const body = await req.body;
    const result = await createCar(body);
    return res.status(200).json({
      message: "Created car successfully!",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
