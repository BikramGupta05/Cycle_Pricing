import Cycle from "../models/Cycle.js";
import Component from "../models/Component.js";

export const createCycle = async (req, res) => {
  try {
    const { name, components } = req.body;

    if (!name || !components.length) {
      return res.status(400).json({
        success: false,
        message: "Cycle name and components are required",
      });
    }

    const selectedComponents = await Component.find({
      _id: {
        $in: components,
      },
    }).populate("category");

    const snapshot = selectedComponents.map((item) => ({
      componentId: item._id,

      name: item.name,

      category: item.category.name,

      price: item.currentPrice,
    }));

    const cycle = await Cycle.create({
      name,
      components: snapshot,
    });

    res.status(201).json({
      success: true,
      data: cycle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCycles = async (req, res) => {
  try {
    const cycles = await Cycle.find().select("name createdAt").sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: cycles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCyclePrice = async (req, res) => {
  try {
    const cycle = await Cycle.findById(req.params.id);

    if (!cycle) {
      return res.status(404).json({
        success: false,
        message: "Cycle not found",
      });
    }

    const totalPrice = cycle.components.reduce(
      (sum, item) => sum + item.price,
      0,
    );

    res.json({
      success: true,

      data: {
        cycleName: cycle.name,
        components: cycle.components,
        totalPrice,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCycle = async (req, res) => {
  try {
    await Cycle.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Cycle deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
