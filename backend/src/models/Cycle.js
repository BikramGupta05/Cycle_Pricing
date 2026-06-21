const mongoose = require("mongoose");

const cycleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    components: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Component",
        required: true,
      },
    ],
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Cycle", cycleSchema);
