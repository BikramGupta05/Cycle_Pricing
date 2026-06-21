const express = require("express");
const cors = require("cors");
const componentRoutes = require("./routes/component.routes");
const cycleRoutes = require("./routes/cycle.routes");

const app = express();

// middleware

app.use(cors());

// allows json data

app.use(express.json());
app.use("/api/components", componentRoutes);
app.use("/api/cycles", cycleRoutes);
// testing route

app.get("/", (req, res) => {
  res.send("Hero Cycle API Running");
});
// handle unknown routes

app.use((req, res) => {
  res.status(404).json({
    success: false,

    message: "API route not found",
  });
});
module.exports = app;
