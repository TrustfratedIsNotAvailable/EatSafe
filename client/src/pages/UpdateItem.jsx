import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router";
import axios from "axios";
import { useTheme } from "../hooks/ThemeContext";
import api from "../api/api";

const UpdateItem = () => {
  const food = useLoaderData();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    foodImage: food.foodImage,
    title: food.title,
    category: food.category,
    quantity: food.quantity,
    expiryDate: food.expiryDate,
    description: food.description,
    addedDate: food.addedDate,
    userEmail: food.userEmail,
    uid: food.uid,
    status: food.status,
  });

  const [errors, setErrors] = useState({});

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

    try {
      await api.put(
        `/food/${food._id}`,
        formData
      );
      toast.success("Item updated successfully!");
      navigate("/my-item");
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Failed to update item.");
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

  return (
    <div className="pb-8">
      <div
        className={`w-full px-4 md:px-8 max-w-3xl mx-auto mt-10 p-6 rounded-xl shadow-md ${
          isDark
            ? "bg-gray-900 text-white shadow-gray-700"
            : "bg-gray-100 text-gray-900"
        }`}
      >
        <h2
          className={`text-3xl font-bold text-center mb-4 ${
            isDark ? "text-blue-400" : "text-blue-500"
          }`}
        >
          Update Food Item
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className={`label font-medium ${isDark ? "text-gray-300" : ""}`}
            >
              Food Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`input w-full rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? "bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
                  : "border border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          <div>
            <label
              className={`label font-medium ${isDark ? "text-gray-300" : ""}`}
            >
              Food Image URL
            </label>
            <input
              type="url"
              name="foodImage"
              value={formData.foodImage}
              onChange={handleChange}
              className={`input w-full rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? "bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
                  : "border border-gray-300"
              }`}
            />
            {errors.foodImage && (
              <p className="text-red-500 text-sm">{errors.foodImage}</p>
            )}
          </div>

          <div>
            <label
              className={`label font-medium ${isDark ? "text-gray-300" : ""}`}
            >
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`select w-full rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? "bg-gray-800 border border-gray-600 text-white"
                  : "border border-gray-300"
              }`}
            >
              <option
                value=""
                className={isDark ? "bg-gray-800 text-white" : ""}
              >
                Select Category
              </option>
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  className={isDark ? "bg-gray-800 text-white" : ""}
                >
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>

          <div>
            <label
              className={`label font-medium ${isDark ? "text-gray-300" : ""}`}
            >
              Quantity
            </label>
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              className={`input w-full rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? "bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
                  : "border border-gray-300"
              }`}
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity}</p>
            )}
          </div>

          <div>
            <label
              className={`label font-medium ${isDark ? "text-gray-300" : ""}`}
            >
              Expiry Date
            </label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className={`input w-full rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? "bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
                  : "border border-gray-300"
              }`}
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-sm">{errors.expiryDate}</p>
            )}
          </div>

          <div>
            <label
              className={`label font-medium ${isDark ? "text-white" : ""}`}
            >
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className={`textarea w-full rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? "bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
                  : "border border-gray-300"
              }`}
            />
          </div>

          <button
            type="submit"
            className={`w-full font-semibold py-2 rounded-lg transition-colors ${
              isDark
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            🔄 Update Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
