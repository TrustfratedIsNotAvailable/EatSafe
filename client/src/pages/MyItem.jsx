import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../hooks/ThemeContext";
import FoodTable from "../components/others/FoodTable";
import { useNavigate } from "react-router";
import api from "../api/api";

const MyItem = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyItems = async () => {
      try {
        const res = await api.get(
          `/food?userEmail=${user.email}`
        );
        setItems(res.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchMyItems();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto my-10 p-4">
        <h2 className="text-3xl font-bold mb-6 text-green-600 text-center">
          <Skeleton width={200} height={30} />
        </h2>

        {/* Skeleton rows simulating the table */}
        <div className="space-y-4">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-6 gap-4 items-center p-4 rounded ${
                isDark ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <Skeleton height={40} width={40} circle />
              <Skeleton height={20} width={`100%`} />
              <Skeleton height={20} width={`100%`} />
              <Skeleton height={20} width={`80%`} />
              <Skeleton height={20} width={`80%`} />
              <Skeleton height={30} width={60} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-4xl mx-auto my-10 p-4`}>
      <h2 className="text-3xl font-bold mb-6 text-green-600 text-center">
        My Items
      </h2>

      {items.length === 0 ? (
        <div
          className={`text-center mt-12 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="Empty box"
            className="w-24 mx-auto mb-4 opacity-60"
          />
          <p className="text-lg font-medium">
            You haven't added any items yet.
          </p>
          <p
            className={`text-sm mt-1 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Start by adding a food item to keep track of it!
          </p>
          <button
            onClick={() => navigate("/add-item")}
            className={`mt-6 px-6 py-3 rounded-md shadow transition font-medium ${
              isDark
                ? "bg-green-900 text-green-200 hover:bg-green-800"
                : "text-blue-700 bg-[#E8F5E990] hover:bg-[#E8F5E9]"
            }`}
          >
            ➕ Add Item
          </button>
        </div>
      ) : (
        <FoodTable myItems={items} setMyItems={setItems} />
      )}
    </div>
  );
};

export default MyItem;
