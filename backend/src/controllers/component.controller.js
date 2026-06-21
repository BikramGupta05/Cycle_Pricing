import Component from "../models/Component.js";

export const createComponent = async (req, res) => {
  try {
    const { name, description, category, currentPrice } = req.body;
    const component = await Component.create({
      name,
      description,
      category,
      currentPrice,
      priceHistory: [{ price: currentPrice }],
    });
    res.status(201).json({
      success: true,
      data: component,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getComponents = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const components = await Component.find(filter)
      .populate("category", "name")
      .select("name description category currentPrice")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: components,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePrice = async (req, res) => {
  try {
    const component = await Component.findById(req.params.id);
    if (!component) {
      return res.status(404).json({
        success: false,
        message: "Component not found",
      });
    }
    component.currentPrice = req.body.price;
    component.priceHistory.push({
      price: req.body.price,
    });
    await component.save();
    const updatedComponent = await Component.findById(component._id)
      .populate("category", "name")
      .select("name category currentPrice description");
    res.json({
      success: true,
      data: updatedComponent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteComponent = async (req, res) => {
  try {
    await Component.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Component deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
