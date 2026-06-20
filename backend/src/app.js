const express = require("express");
const cors = require("cors");

const app = express();

// middleware

app.use(cors());

// allows json data

app.use(express.json());

// testing route

app.get("/", (req, res) => {
  res.send("Hero Cycle API Running");
});

module.exports = app;
