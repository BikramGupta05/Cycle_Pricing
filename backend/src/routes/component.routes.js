import express from "express";
import {
  createComponent,
  getComponents,
  updatePrice,
  deleteComponent,
} from "../controllers/component.controller.js";

const router = express.Router();

router.route("/").get(getComponents).post(createComponent);
router.patch("/:id/price", updatePrice);
router.delete("/:id", deleteComponent);

export default router;
