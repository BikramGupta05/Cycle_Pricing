import { useEffect, useState } from "react";
import api from "../api/axios";

export default function PriceCalculator() {
  const [cycles, setCycles] = useState([]);
  const [selected, setSelected] = useState("");
  const [price, setPrice] = useState(null);

  useEffect(() => {
    fetchCycles();
  }, []);

  const fetchCycles = async () => {
    const { data } = await api.get("/cycles");
    setCycles(data.data);
  };

  const calculatePrice = async (id) => {
    setSelected(id);

    if (!id) {
      setPrice(null);
      return;
    }

    const { data } = await api.get(`/cycles/${id}/price`);
    setPrice(data.data);
  };

  const deleteCycle = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this cycle?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/cycles/${selected}`);

      setCycles((prev) => prev.filter((cycle) => cycle._id !== selected));

      setSelected("");
      setPrice(null);
    } catch (error) {
      alert(error.response?.data?.message || "Unable to delete cycle");
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-bold mb-8">Price Calculator</h1>

      <div className="bg-white border rounded-xl p-5 w-full md:w-[450px] mb-8 shadow-sm">
        <h2 className="font-semibold mb-4">Select Cycle</h2>

        <select
          className="border rounded-lg px-4 py-2 w-full outline-none focus:border-blue-500"
          value={selected}
          onChange={(e) => calculatePrice(e.target.value)}
        >
          <option value="">Choose cycle</option>

          {cycles.map((cycle) => (
            <option key={cycle._id} value={cycle._id}>
              {cycle.name}
            </option>
          ))}
        </select>
      </div>

      {price && (
        <div className="bg-gray-50 border rounded-xl shadow-sm p-6 w-full md:w-[500px]">
          <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center mb-6">
            <h2 className="bg-gray-300 border rounded-lg px-4 py-2 text-xl font-semibold">
              {price.cycleName}
            </h2>

            <button
              type="button"
              onClick={deleteCycle}
              className="bg-red-300 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium"
            >
              Delete Cycle
            </button>
          </div>

          {price.components.map((item) => (
            <div
              key={item.name}
              className="flex justify-between items-center border-b py-3"
            >
              <div>
                <p className="font-medium">{item.name}</p>

                <p className="text-sm text-gray-500">{item.category}</p>
              </div>

              <p className="font-medium">₹{item.price}</p>
            </div>
          ))}

          <div className="flex justify-between mt-5 text-lg font-bold">
            <span>Total Price</span>

            <span>₹{price.totalPrice}</span>
          </div>
        </div>
      )}

      {!price && (
        <p className="text-gray-500">Select a cycle to view price breakdown</p>
      )}
    </section>
  );
}
