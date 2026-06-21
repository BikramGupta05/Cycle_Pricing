import { useEffect, useState } from "react";
import api from "../api/axios";

const initialForm = {
  name: "",
  category: "",
  currentPrice: "",
};

export default function Components() {
  const [components, setComponents] = useState([]);
  const [categories, setCategories] = useState([]);

  const [categoryName, setCategoryName] = useState("");
  const [search, setSearch] = useState("");

  const [error, setError] = useState("");

  const [editId, setEditId] = useState(null);
  const [newPrice, setNewPrice] = useState("");

  const [form, setForm] = useState(initialForm);

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

  const addCategory = async () => {
    if (!categoryName.trim()) {
      setError("Category name is required");
      return;
    }

    await api.post("/categories", {
      name: categoryName,
    });

    setCategoryName("");
    setError("");

    fetchData();
  };

  const addComponent = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Component name is required");
      return;
    }

    if (!form.category) {
      setError("Please select category");
      return;
    }

    if (!form.currentPrice) {
      setError("Component price is required");
      return;
    }

    if (Number(form.currentPrice) <= 0) {
      setError("Price should be greater than zero");
      return;
    }

    await api.post("/components", {
      ...form,
      currentPrice: Number(form.currentPrice),
    });

    setForm(initialForm);

    setError("");

    fetchData();
  };

  const updatePrice = async (id) => {
    if (!newPrice) {
      setError("Price is required");
      return;
    }

    if (Number(newPrice) <= 0) {
      setError("Price should be greater than zero");
      return;
    }

    const { data } = await api.patch(`/components/${id}/price`, {
      price: Number(newPrice),
    });

    setComponents((prev) =>
      prev.map((item) => (item._id === id ? data.data : item)),
    );

    setEditId(null);

    setNewPrice("");

    setError("");
  };

  const deleteComponent = async (id) => {
    const confirmDelete = window.confirm("Delete this component?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/components/${id}`);

      setComponents((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Unable to delete component");
    }
  };

  const deleteCategory = async (id) => {
    const confirmDelete = window.confirm("Delete category and its components?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/categories/${id}`);

      setCategories((prev) => prev.filter((item) => item._id !== id));

      setComponents((prev) => prev.filter((item) => item.category?._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Unable to delete category");
    }
  };

  const filteredComponents = components.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section>
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">Components</h1>

        <input
          className="border rounded-lg px-4 py-2 w-full md:w-72"
          placeholder="Search component..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white p-5 rounded-xl shadow mb-8">
        <div className="flex flex-col md:flex-row gap-3 mb-5">
          <input
            className="border rounded-lg px-4 py-2"
            placeholder="New category"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
              setError("");
            }}
          />

          <button
            onClick={addCategory}
            className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-lg"
          >
            Add Category
          </button>
        </div>

        <form
          onSubmit={addComponent}
          className="flex flex-col md:flex-row gap-3"
        >
          <input
            className="border rounded-lg px-4 py-2"
            placeholder="Component name"
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              setError("");
            }}
          />

          <select
            className="border rounded-lg px-4 py-2"
            value={form.category}
            onChange={(e) => {
              setForm({ ...form, category: e.target.value });
              setError("");
            }}
          >
            <option value="">Category</option>

            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>

          <input
            className="border rounded-lg px-4 py-2"
            placeholder="Price"
            value={form.currentPrice}
            onChange={(e) => {
              setForm({ ...form, currentPrice: e.target.value });
              setError("");
            }}
          />

          <button className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-lg">
            Add
          </button>
        </form>

        {error && <p className="text-red-600 mt-4 font-medium">{error}</p>}
      </div>

      {categories.map((category) => {
        const items = filteredComponents.filter(
          (item) => item.category?._id === category._id,
        );

        if (!items.length) return null;

        return (
          <div key={category._id} className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold">{category.name}</h2>

              <button
                onClick={() => deleteCategory(category._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
              >
                Delete Category
              </button>
            </div>

            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow p-5 flex flex-col md:flex-row justify-between gap-4 mb-3"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>

                  {editId === item._id ? (
                    <input
                      className="border rounded px-2"
                      value={newPrice}
                      onChange={(e) => {
                        setNewPrice(e.target.value);
                        setError("");
                      }}
                    />
                  ) : (
                    <p>₹{item.currentPrice}</p>
                  )}
                </div>

                <div className="flex gap-5 items-center">
                  {editId === item._id ? (
                    <button
                      onClick={() => updatePrice(item._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditId(item._id);
                        setNewPrice(item.currentPrice);
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Edit Price
                    </button>
                  )}

                  <button
                    onClick={() => deleteComponent(item._id)}
                    className="bg-red-300 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </section>
  );
}
