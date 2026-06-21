import Cycle from "../models/Cycle.js";
import { calculateCyclePrice } from "../services/pricing.service.js";

export const createCycle = async (req, res) => {
  try {
    const { name, components } = req.body;
    if (!name || !components?.length) {
      return res.status(400).json({
        success: false,
        message: "Cycle name and components are required",
      });
    }
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

export const getCyclePrice = async (req, res) => {
  try {
    const price = await calculateCyclePrice(req.params.id);
    if (!price) {
      return res.status(404).json({
        success: false,
        message: "Cycle not found",
      });
    }
    res.json({
      success: true,
      data: price,
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
    const cycles = await Cycle.find().select("name").sort({ createdAt: -1 });
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
