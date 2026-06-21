const Cycle = require("../models/Cycle");

const calculateCyclePrice = async (cycleId) => {
  const cycle = await Cycle.findById(cycleId).populate(
    "components",
    "name category currentPrice",
  );

  if (!cycle) {
    return null;
  }

  let totalPrice = 0;

  const breakdown = cycle.components.map((component) => {
    totalPrice += component.currentPrice;

    return {
      name: component.name,

      category: component.category,

      price: component.currentPrice,
    };
  });

  return {
    cycleName: cycle.name,

    components: breakdown,

    totalPrice,
  };
};

module.exports = {
  calculateCyclePrice,
};
