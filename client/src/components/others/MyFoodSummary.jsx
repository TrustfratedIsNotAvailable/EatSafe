import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../hooks/ThemeContext";
import api from "../../api/api";

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
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [chartData, setChartData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchMyFoods = async () => {
      try {
        const res = await api.get(
          `/food?userEmail=${user.email}`
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

  // Dynamic theme styles
  const containerBg = isDark ? "bg-gray-900" : "bg-white";
  const textPrimary = isDark ? "text-blue-300" : "text-blue-600";
  const totalText = isDark ? "text-white" : "text-black";
  const noDataText = isDark ? "text-gray-400" : "text-gray-500";
  const cardShadow = isDark ? "shadow-lg shadow-gray-800" : "shadow";

  return (
    <div
      className={`w-full text-center p-6 max-w-3xl mx-auto rounded-2xl mt-10 transition-colors duration-300 ${containerBg} ${cardShadow}`}
    >
      <h2 className={`text-2xl font-bold mb-2 ${textPrimary}`}>
        My Food Summary
      </h2>
      <p className="text-lg font-semibold mb-6">
        Total Foods: <span className={totalText}>{total}</span>
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
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#2e2e2e" : "#ffffff",
                  color: isDark ? "#ffffff" : "#000000",
                }}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  color: isDark ? "#ffffff" : "#000000",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className={`mt-6 ${noDataText}`}>
          No food data available to display.
        </p>
      )}
    </div>
  );
};

export default MyFoodSummary;
