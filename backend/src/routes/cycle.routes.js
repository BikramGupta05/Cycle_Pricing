const express = require("express");

const {
  createCycle,

  getCycles,

  getCyclePrice,
} = require("../controllers/cycle.controller");

const router = express.Router();

router
  .route("/")

  .post(createCycle)

  .get(getCycles);

router.get("/:id/price", getCyclePrice);

module.exports = router;
