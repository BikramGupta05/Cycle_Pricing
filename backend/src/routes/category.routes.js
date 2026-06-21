import express from "express";

import {
  createCategory,
  getCategories,
  deleteCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

router.route("/").get(getCategories).post(createCategory);

router.route("/:id").delete(deleteCategory);

export default router;
