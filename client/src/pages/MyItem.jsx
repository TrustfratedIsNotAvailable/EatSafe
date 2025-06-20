import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Spinner from "../components/shared/Spinner";
import FoodTable from "../others/FoodTable";

const MyItem = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyItems = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/food?userEmail=${user.email}`
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
      <h2 className="text-2xl font-semibold mb-4 text-green-700">My Items</h2>
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <FoodTable myItems={items} setMyItems={setItems} />
      )}
    </div>
  );
};

export default MyItem;
