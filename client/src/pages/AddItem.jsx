import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../hooks/ThemeContext";
import api from "../api/api";

const AddItem = () => {
  const { user } = useAuth();
  const { theme } = useTheme();


  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    foodImage: "",
    title: "",
    category: "",
    quantity: "",
    expiryDate: "",
    description: "",
    addedDate: new Date().toISOString().split("T")[0],
    userEmail: "",
    uid: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    const validateImageURL = (url) => /^(http|https):\/\/[^ "]+$/.test(url);

    if (!formData.foodImage.trim()) {
      newErrors.foodImage = "Image URL is required.";
    } else if (!validateImageURL(formData.foodImage.trim())) {
      newErrors.foodImage = "Please enter a valid image URL.";
    }
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.category.trim()) newErrors.category = "Category is required.";
    if (!formData.quantity || formData.quantity <= 0)
      newErrors.quantity = "Enter a valid quantity.";
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors in the form.");
      return;
    }

    const payload = {
      ...formData,
      userEmail: user?.email,
      uid: user?.uid,
    };

    try {
      await api.post("/food", payload);
      toast.success("Item added successfully!");
      setFormData({
        foodImage: "",
        title: "",
        category: "",
        quantity: "",
        expiryDate: "",
        description: "",
        addedDate: new Date().toISOString().split("T")[0],
        userEmail: "",
        uid: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("Failed to add item. Please try again.");
    }
  };

  const categories = [
    "Fruits",
    "Vegetables",
    "Dairy",
    "Grains",
    "Meat",
    "Other",
  ];

  const darkClass = theme === "dark";

  return (
    <div className="pb-8"> <div
      className={`w-full px-4 md:px-8 max-w-3xl mx-auto mt-10 p-6 rounded-xl shadow-md transition 
      ${darkClass ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
    >
      <h2 className="text-3xl font-bold text-green-600 text-center mb-4">
        Add New Food Item
      </h2>
      <p className="text-center font-semibold text-xl mb-6">
        Fill up the Details page to add Foods!
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* All inputs below */}
        <div>
          <label className="label font-medium">Food Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full border rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 ${
              darkClass
                ? "bg-gray-800 text-white border-gray-700 focus:ring-green-500"
                : "bg-white border-gray-300 focus:ring-[#1B5E20]"
            }`}
            placeholder="Enter food title"
            required
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="label font-medium">Food Image URL</label>
          <input
            type="url"
            name="foodImage"
            value={formData.foodImage}
            onChange={handleChange}
            className={`w-full border rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 ${
              darkClass
                ? "bg-gray-800 text-white border-gray-700 focus:ring-green-500"
                : "bg-white border-gray-300 focus:ring-[#1B5E20]"
            }`}
            placeholder="Paste image URL"
            required
          />
          {errors.foodImage && (
            <p className="text-red-500 text-sm mt-1">{errors.foodImage}</p>
          )}
        </div>

        <div>
          <label className="label font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`select w-full border rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 ${
              darkClass
                ? "bg-gray-800 text-white border-gray-700 focus:ring-green-500"
                : "bg-white border-gray-300 focus:ring-[#1B5E20]"
            }`}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="label font-medium">Quantity</label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className={`w-full border rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 ${
              darkClass
                ? "bg-gray-800 text-white border-gray-700 focus:ring-green-500"
                : "bg-white border-gray-300 focus:ring-[#1B5E20]"
            }`}
            min="1"
            placeholder=""
            required
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
          )}
        </div>

        <div>
          <label className="label font-medium">Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className={`w-full border rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 ${
              darkClass
                ? "bg-gray-800 text-white border-gray-700 focus:ring-green-500"
                : "bg-white border-gray-300 focus:ring-[#1B5E20]"
            }`}
            required
          />
          {errors.expiryDate && (
            <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
          )}
        </div>

        <div>
          <label className="label font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`textarea w-full border rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 ${
              darkClass
                ? "bg-gray-800 text-white border-gray-700 focus:ring-green-500"
                : "bg-white border-gray-300 focus:ring-[#1B5E20]"
            }`}
            rows="3"
            placeholder="Write short description about the item"
          />
        </div>

        <button
          type="submit"
          className={`w-full font-semibold py-2 rounded-lg transition duration-200 ${
            darkClass
              ? "bg-green-700 hover:bg-green-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          ➕ Add Item
        </button>
      </form>
    </div></div>
   
  );
};

export default AddItem;
