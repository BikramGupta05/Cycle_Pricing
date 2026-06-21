import mongoose from "mongoose";

const priceHistorySchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    changedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

const componentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    currentPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    priceHistory: [priceHistorySchema],
  },
  { timestamps: true },
);

componentSchema.index({ category: 1 });

export default mongoose.model("Component", componentSchema);
