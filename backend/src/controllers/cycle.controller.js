const Cycle = require("../models/Cycle");

const { calculateCyclePrice } = require("../services/pricing.service");

// create cycle configuration

exports.createCycle = async (req, res) => {
  try {
    const { name, components } = req.body;

    const cycle = await Cycle.create({
      name,
      components,
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

// get all cycles

exports.getCycles = async (req, res) => {
  try {
    const cycles = await Cycle.find()
      .select("name components")
      .populate("components", "name category");

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

// pricing calculation

exports.getCyclePrice = async (req, res) => {
  try {
    const result = await calculateCyclePrice(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Cycle not found",
      });
    }

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
