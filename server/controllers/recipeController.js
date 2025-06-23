const axios = require("axios");

// Helper to deduplicate recipes by id
const dedupeById = (arr) => {
  const seen = new Set();
  return arr.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
};

exports.getSuggestions = async (req, res) => {
  const { ingredients } = req.query;

  if (!ingredients) return res.json({ recipes: [] });

  try {
    const ingredientList = ingredients
      .split(",")
      .map((ing) => ing.trim().toLowerCase())
      .filter(Boolean);

    let allMeals = [];

    for (const ing of ingredientList) {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ing)}`
      );

      const meals = response.data.meals || [];
      const mapped = meals.map((meal) => ({
        id: meal.idMeal,
        title: meal.strMeal,
        thumbnail: meal.strMealThumb,
      }));

      allMeals = allMeals.concat(mapped);
    }

    const uniqueMeals = dedupeById(allMeals);
    const suggestions = uniqueMeals.slice(0, 5);

    res.json({ recipes: suggestions });
  } catch (err) {
    console.error("Error fetching recipes:", err.message);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
};
