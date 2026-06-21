const mongoose = require("mongoose");

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
  {
    _id: false,
  },
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
      type: String,

      enum: ["FRAME", "TYRE", "GEAR", "BRAKE", "CHAIN", "SEAT"],

      required: true,
    },

    currentPrice: {
      type: Number,

      required: true,

      min: 0,
    },

    priceHistory: [priceHistorySchema],
  },

  {
    timestamps: true,
  },
);

// faster searching by category

componentSchema.index({
  category: 1,
});

module.exports = mongoose.model("Component", componentSchema);
