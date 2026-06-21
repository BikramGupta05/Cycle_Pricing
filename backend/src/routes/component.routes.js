const express = require("express");

const {
  createComponent,

  getComponents,

  updatePrice,

  deleteComponent,
} = require("../controllers/component.controller");

const router = express.Router();

router
  .route("/")

  .post(createComponent)

  .get(getComponents);

router.patch(
  "/:id/price",

  updatePrice,
);

router.delete(
  "/:id",

  deleteComponent,
);

module.exports = router;
