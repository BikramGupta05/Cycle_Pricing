import express from "express";

import {
  createCycle,
  getCycles,
  getCyclePrice,
  deleteCycle,
} from "../controllers/cycle.controller.js";

const router = express.Router();

router.route("/").get(getCycles).post(createCycle);
router.get("/:id/price", getCyclePrice);
router.delete("/:id", deleteCycle);

export default router;
