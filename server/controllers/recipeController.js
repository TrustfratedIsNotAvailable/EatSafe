
const axios = require("axios");

const dedupeById = (arr) => {
  const seen = new Set();
  return arr.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
};

const getSuggestions = async (req, res) => {
  const { ingredients } = req.query;

  if (!ingredients) return res.json({ recipes: [] });

  try {
    const ingredientList = [...new Set(
      ingredients
        .split(",")
        .map((ing) => ing.trim().toLowerCase())
        .filter(Boolean)
    )];

    const responses = await Promise.all(
      ingredientList.map((ing) =>
        axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ing)}`
        )
      )
    );

    const allMeals = responses.flatMap((res) => {
      const meals = res.data.meals || [];
      return meals.map((meal) => ({
        id: meal.idMeal,
        title: meal.strMeal,
        thumbnail: meal.strMealThumb,
      }));
    });

    const uniqueMeals = dedupeById(allMeals);
    const suggestions = uniqueMeals.slice(0, 6);

    res.json({ recipes: suggestions });
  } catch (err) {
    console.error("Error fetching recipes:", err.message);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
};

module.exports = { getSuggestions };
