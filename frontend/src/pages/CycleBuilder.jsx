import { useEffect, useState } from "react";
import api from "../api/axios";

export default function CycleBuilder() {
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [components, setComponents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [componentRes, categoryRes] = await Promise.all([
      api.get("/components"),
      api.get("/categories"),
    ]);

    setComponents(componentRes.data.data);
    setCategories(categoryRes.data.data);
  };

  const toggleComponent = (id) => {
    setError("");

    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const filteredComponents = components.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const selectedComponents = components.filter((item) =>
    selected.includes(item._id),
  );

  const totalPrice = selectedComponents.reduce(
    (sum, item) => sum + item.currentPrice,
    0,
  );

  const createCycle = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Cycle name is required");
      return;
    }

    if (!selected.length) {
      setError("Select at least one component");
      return;
    }

    await api.post("/cycles", {
      name,
      components: selected,
    });

    setName("");
    setSelected([]);
    setError("");

    alert("Cycle created");
  };

  return (
    <section>
      <h1 className="text-3xl font-bold mb-8">Build Cycle</h1>

      <form
        onSubmit={createCycle}
        className="flex flex-col lg:flex-row gap-10 items-start"
      >
        <div className="w-full lg:w-[480px]">
          <div className="bg-white border rounded-xl p-5 mb-6">
            <h2 className="font-semibold mb-4">Cycle Details</h2>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                className="border rounded-lg px-4 py-2 flex-1"
                placeholder="Cycle name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
              />

              <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 rounded-lg">
                Create
              </button>
            </div>

            {error && <p className="text-red-600 mt-3">{error}</p>}
          </div>

          <input
            className="border rounded-lg px-4 py-2 w-full mb-6"
            placeholder="Search component..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {categories.map((category) => {
            const items = filteredComponents.filter(
              (item) => item.category?._id === category._id,
            );

            if (!items.length) return null;

            return (
              <div key={category._id} className="mb-6">
                <h2 className="font-bold mb-3">{category.name}</h2>

                {items.map((item) => (
                  <label
                    key={item._id}
                    className="bg-white border rounded-lg p-4 flex justify-between cursor-pointer mb-3"
                  >
                    <div>
                      <input
                        type="checkbox"
                        checked={selected.includes(item._id)}
                        onChange={() => toggleComponent(item._id)}
                      />

                      <span className="ml-3">{item.name}</span>
                    </div>

                    <span>₹{item.currentPrice}</span>
                  </label>
                ))}
              </div>
            );
          })}
        </div>

        {selectedComponents.length > 0 && (
          <div className="bg-white border rounded-xl p-5 w-full lg:w-96 lg:sticky top-5">
            <h2 className="underline font-semibold text-xl mb-5">
              Price Preview
            </h2>

            {selectedComponents.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center mb-4"
              >
                <div>
                  <p className="font-medium">{item.name}</p>

                  <p className="text-sm text-gray-500">{item.category?.name}</p>
                </div>

                <div className="flex items-center gap-5">
                  <span>₹{item.currentPrice}</span>

                  <button
                    type="button"
                    className="bg-red-300 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    onClick={() => toggleComponent(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <hr className="my-4" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>

              <span>₹{totalPrice}</span>
            </div>
          </div>
        )}
      </form>
    </section>
  );
}
