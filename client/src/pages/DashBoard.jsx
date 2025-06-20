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

const Dashboard = () => {
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

  //stats
  const summaryStats = [
    { label: "Total Items", value: totalItems },
    { label: "Expiring Soon", value: expiringSoonCount },
    { label: "Expired", value: expiredCount },
    { label: "Total Category", value: 10 },
  ];

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

  //category counts
  const categoryData = categories.map((category) => ({
    category,
    count: foodData.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    ).length,
  }));

  // Expiring soon items (top 4 soonest)
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

  // Recent activity - dummy
  const recentActivity = [
    `You have ${totalItems} total food items.`,
    `There are ${expiringSoonCount} items expiring soon.`,
    `You have ${expiredCount} expired items.`,
  ];

  return (
    <div className="max-w-7xl px-4 md:px-8 py-6 mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#1B5E20]">📊 Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {summaryStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white shadow rounded-xl p-4 text-center border border-gray-200"
          >
            <p className="text-lg font-semibold text-gray-600">{stat.label}</p>
            <p className="text-2xl font-bold text-green-600">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts & Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Expiring Soon */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-[#1B5E20]">
            ⏰ Expiring Soon
          </h2>
          <ul className="space-y-2">
            {expiringSoonItems.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b border-b-gray-200 pb-1"
              >
                <span>{item.title}</span>
                <span className="text-sm text-red-600">{item.expiryDate}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Category Chart */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-[#1B5E20]">
            📦 Category Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#1B5E20" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white p-4 rounded-xl shadow border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-[#1B5E20]">
          📝 Recent Activity
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {recentActivity.map((act, i) => (
            <li key={i}>{act}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
