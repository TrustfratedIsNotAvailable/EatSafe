import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../../context/AuthContext";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28DFF",
  "#FF6495",
  "#4CAF50",
  "#F44336",
  "#E91E63",
  "#9C27B0",
];

const MyFoodSummary = () => {
  const { user } = useAuth();
  const [chartData, setChartData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchMyFoods = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/food?userEmail=${user.email}`
        );
        const foodList = res.data;

        const categoryCount = foodList.reduce((acc, food) => {
          acc[food.category] = (acc[food.category] || 0) + 1;
          return acc;
        }, {});

        const data = Object.entries(categoryCount).map(([category, count]) => ({
          name: category,
          value: count,
        }));

        setChartData(data);
        setTotal(foodList.length);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };

    if (user?.email) {
      fetchMyFoods();
    }
  }, [user]);

  return (
    <div className="w-full text-center p-6 max-w-3xl mx-auto bg-white shadow rounded-2xl mt-10">
      <h2 className="text-2xl font-bold text-blue-600 mb-2">My Food Summary</h2>
      <p className="text-lg font-semibold mb-6">
        Total Foods: <span className="text-black">{total}</span>
      </p>

      {total > 0 ? (
        <div className="flex justify-center">
          <ResponsiveContainer width={400} height={400}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-gray-500 mt-6">No food data available to display.</p>
      )}
    </div>
  );
};

export default MyFoodSummary;
