import axios from "axios";

export const foodLoader = async () => {
  try {
    const res = await axios.get("http://localhost:3000/food");
    return res.data; // This will be available as loader data
  } catch (error) {
    throw new Response("Failed to load food items", { status: 500 });
  }
};