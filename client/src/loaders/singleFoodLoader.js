
import api from "../api/api";

export const singleFoodLoader = async ({ params }) => {
  const { id } = params;
  try {
    const res = await api.get(`/food/${id}`);
    return res.data;
  } catch (error) {
    throw new Response("Failed to load food detail", { status: 404 });
  }
};
