import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useLoaderData } from "react-router";
import { useTheme } from "../hooks/ThemeContext";


const Dashboard = () => {
  const { theme } = useTheme();
  const foodData = useLoaderData();
  const [nearlyExpiredItems, setNearlyExpiredItems] = useState([]);

  const now = new Date();
  const expiringSoonDays = 5;

  useEffect(() => {
    const soonItems = foodData.filter(
      (item) => item.status === "nearly expired"
    );
    setNearlyExpiredItems(soonItems);
  }, [foodData]);

  const expiringSoonCount = nearlyExpiredItems.length;
  const totalItems = foodData.length;

  const expiredCount = foodData.filter(
    (item) => item.status === "expired"
  ).length;

  const summaryStats = [
    { label: "Total Items", value: totalItems },
    { label: "Expiring Soon", value: expiringSoonCount },
    { label: "Expired", value: expiredCount },
    { label: "Total Category", value: 6 },
  ];

  const categories = [
    "Fruits",
    "Vegetables",
    "Dairy",
    "Grains",
    "Meat",
    "Other",
  ];

  const categoryData = categories.map((category) => ({
    category,
    count: foodData.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    ).length,
  }));

  const expiringSoonItems = nearlyExpiredItems
    .filter((item) => {
      const expiry = new Date(item.expiryDate);
      return (
        expiry >= now &&
        expiry <=
          new Date(now.getTime() + expiringSoonDays * 24 * 60 * 60 * 1000)
      );
    })
    .sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate))
    .slice(0, 4);

  const recentActivity = [
    `You have ${totalItems} total food items.`,
    `There are ${expiringSoonCount} items expiring soon.`,
    `You have ${expiredCount} expired items.`,
  ];

  const cardClass = `${
    theme === "dark"
      ? "bg-gray-800 text-white border-gray-700"
      : "bg-white text-gray-900 border-gray-200"
  } shadow rounded-xl p-4`;

  const sectionHeading = `text-xl font-semibold mb-4 ${
    theme === "dark" ? "text-green-300" : "text-[#1B5E20]"
  }`;

  return (
    <div
      className={`max-w-7xl px-4 md:px-8 py-6 mx-auto ${
        theme === "dark" ? "text-white" : "text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6 text-[#1B5E20]">📊 Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {summaryStats.map((stat) => (
          <div key={stat.label} className={cardClass}>
            <p className="text-lg font-semibold text-gray-400">{stat.label}</p>
            <p className="text-2xl font-bold text-green-500">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts & Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Expiring Soon */}
        <div className={cardClass}>
          <h2 className={sectionHeading}>⏰ Expiring Soon</h2>
          <ul className="space-y-2">
            {expiringSoonItems.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b border-gray-300 pb-1"
              >
                <span>{item.title}</span>
                <span className="text-sm text-red-400">{item.expiryDate}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Category Chart */}
        <div className={cardClass}>
          <h2 className={sectionHeading}>📦 Category Breakdown</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryData}>
              <XAxis
                dataKey="category"
                stroke={theme === "dark" ? "#fff" : "#000"}
              />
              <YAxis stroke={theme === "dark" ? "#fff" : "#000"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#333" : "#fff",
                  color: theme === "dark" ? "#fff" : "#000",
                }}
              />
              <Bar dataKey="count" fill="#1B5E20" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={`${cardClass} mt-8`}>
        <h2 className={sectionHeading}>📝 Recent Activity</h2>
        <ul className="list-disc list-inside text-sm space-y-1">
          {recentActivity.map((act, i) => (
            <li key={i}>{act}</li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default Dashboard;
