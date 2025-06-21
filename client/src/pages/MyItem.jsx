import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Spinner from "../components/shared/Spinner";
import FoodTable from "../components/others/FoodTable";
import { useNavigate } from "react-router";

const MyItem = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyItems = async () => {
      try {
        const res = await axios.get(
          `https://eatsafe-server.vercel.app/food?userEmail=${user.email}`
          // `${import.meta.env.VITE_API_URL}/food?userEmail=${user.email}`
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

  if (loading) return <Spinner />;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold mb-6 text-green-600 text-center">
        My Items
      </h2>

      {items.length === 0 ? (
        <div className="text-center mt-12 text-gray-600">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="Empty box"
            className="w-24 mx-auto mb-4 opacity-60"
          />
          <p className="text-lg font-medium">
            You haven't added any items yet.
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Start by adding a food item to keep track of it!
          </p>
          <button
            onClick={() => navigate("/add-item")}
            className="mt-6  text-blue-700 px-6 py-3 rounded-md shadow bg-[#E8F5E990] hover:bg-[#E8F5E9] transition font-medium"
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
