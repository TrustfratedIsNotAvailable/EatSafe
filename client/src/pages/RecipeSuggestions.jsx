import React, { useEffect, useMemo, useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { useTheme } from "../hooks/ThemeContext";
import api from "../api/api";

const RecipeSuggestions = ({ expiringFoods = [], mode = "nearlyExpired" }) => {
  const [recipes, setRecipes] = useState([]);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const ingredientList = useMemo(
    () => expiringFoods.map((f) => f.title).join(","),
    [expiringFoods]
  );

  useEffect(() => {
    if (!ingredientList) return;

    api
      .get("/recipes/suggestions", {
        params: { ingredients: ingredientList },
      })
      .then((res) => {
        setRecipes(res.data.recipes || []);
      })
      .catch((err) => {
        console.error(err);
        setRecipes([]);
      });
  }, [ingredientList]);

  if (recipes.length === 0) return null;

  return (
    <div
      className={`mt-6 px-4 py-5 rounded-xl shadow-md border ${
        isDark
          ? "bg-gray-900 text-white border-gray-700"
          : "bg-white text-gray-900 border-gray-200"
      }`}
    >
      <div className="flex items-center mb-4 gap-2">
        <FaUtensils
          className={`text-xl ${
            isDark ? "text-emerald-400" : "text-emerald-600"
          }`}
        />
        <h3 className="text-xl font-bold">
          {mode === "allNonExpired"
            ? "Recipes using your non-expired ingredients"
            : "Quick Recipes for Nearly Expired Foods"}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {recipes.map((r) => (
          <a
            key={r.id}
            href={`https://www.themealdb.com/meal.php?c=${r.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`group rounded-lg p-4 shadow-sm hover:shadow-md transition transform hover:-translate-y-1 border ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <img
              src={r.thumbnail}
              alt={r.title}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h4
              className={`text-lg font-semibold group-hover:text-emerald-600 ${
                isDark
                  ? "text-gray-100 group-hover:text-emerald-400"
                  : "text-gray-900"
              }`}
            >
              {r.title}
            </h4>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Click to view the full recipe →
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RecipeSuggestions;
