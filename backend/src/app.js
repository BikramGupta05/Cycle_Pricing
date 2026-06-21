import express from "express";
import cors from "cors";

import componentRoutes from "./routes/component.routes.js";
import cycleRoutes from "./routes/cycle.routes.js";
import categoryRoutes from "./routes/category.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hero Cycle Pricing API running",
  });
});

app.use("/api/components", componentRoutes);
app.use("/api/cycles", cycleRoutes);
app.use("/api/categories", categoryRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
