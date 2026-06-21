import mongoose from "mongoose";

const cycleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    components: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Component",
        },
      ],
      validate: {
        validator: (value) => value.length > 0,
        message: "Select at least one component",
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Cycle", cycleSchema);
