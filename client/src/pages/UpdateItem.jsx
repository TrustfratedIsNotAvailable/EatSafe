import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router";
import axios from "axios";

const UpdateItem = () => {
  const food = useLoaderData();
  console.log(food);
  const navigate = useNavigate();

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
      const response = await axios.put(
        `https://eatsafe-server.vercel.app/food/${food._id}`
        // `${import.meta.env.VITE_API_URL}/food/${food._id}`
        ,
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
    "Grains & Cereals",
    "Dairy Products",
    "Meat & Poultry",
    "Seafood",
    "Snacks",
    "Beverages",
    "Baked Goods",
    "other",
  ];

  return (
    <div className="w-full px-4 md:px-8 max-w-3xl mx-auto mt-10 bg-gray-100 p-6 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-blue-500 text-center mb-4">
        Update Food Item
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label font-medium">Food Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input w-full border border-gray-300 rounded px-4 py-2"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="label font-medium">Food Image URL</label>
          <input
            type="url"
            name="foodImage"
            value={formData.foodImage}
            onChange={handleChange}
            className="input w-full border border-gray-300 rounded px-4 py-2"
          />
          {errors.foodImage && (
            <p className="text-red-500 text-sm">{errors.foodImage}</p>
          )}
        </div>

        <div>
          <label className="label font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="select w-full border border-gray-300 rounded px-4 py-2"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="label font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="input w-full border border-gray-300 rounded px-4 py-2"
            min="1"
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm">{errors.quantity}</p>
          )}
        </div>

        <div>
          <label className="label font-medium">Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="input w-full border border-gray-300 rounded px-4 py-2"
          />
          {errors.expiryDate && (
            <p className="text-red-500 text-sm">{errors.expiryDate}</p>
          )}
        </div>

        <div>
          <label className="label font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="textarea w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
        >
          🔄 Update Item
        </button>
      </form>
    </div>
  );
};

export default UpdateItem;
