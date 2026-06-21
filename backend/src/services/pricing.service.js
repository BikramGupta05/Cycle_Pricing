import Cycle from "../models/Cycle.js";

export const calculateCyclePrice = async (cycleId) => {
  const cycle = await Cycle.findById(cycleId).populate({
    path: "components",
    select: "name category currentPrice",
    populate: {
      path: "category",
      select: "name",
    },
  });
  if (!cycle) return null;
  let totalPrice = 0;
  const components = cycle.components.map((item) => {
    totalPrice += item.currentPrice;
    return {
      name: item.name,
      category: item.category.name,
      price: item.currentPrice,
    };
  });
  return {
    cycleName: cycle.name,
    components,
    totalPrice,
  };
};
