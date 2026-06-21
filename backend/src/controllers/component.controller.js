const Component = require("../models/Component");

// CREATE COMPONENT

exports.createComponent = async (req, res) => {
  try {
    const component = await Component.create({
      ...req.body,

      priceHistory: [
        {
          price: req.body.currentPrice,
        },
      ],
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

// GET COMPONENTS

exports.getComponents = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    const components = await Component.find(filter)

      .select("name category currentPrice description")

      .sort({
        createdAt: -1,
      });

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

// UPDATE ONLY PRICE

exports.updatePrice = async (req, res) => {
  try {
    const { price } = req.body;

    const component = await Component.findById(req.params.id);

    if (!component) {
      return res.status(404).json({
        success: false,

        message: "Component not found",
      });
    }

    component.currentPrice = price;

    component.priceHistory.push({
      price,
    });

    await component.save();

    res.json({
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

// DELETE COMPONENT

exports.deleteComponent = async (req, res) => {
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
