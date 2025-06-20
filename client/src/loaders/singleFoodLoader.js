import axios from "axios";

export const singleFoodLoader = async ({ params }) => {
  const { id } = params;
  try {
    const res = await axios.get(`http://localhost:3000/food/${id}`);
    return res.data;
  } catch (error) {
    throw new Response("Failed to load food detail", { status: 404 });
  }
};
