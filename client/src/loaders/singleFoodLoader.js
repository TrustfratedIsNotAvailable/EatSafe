import axios from "axios";

export const singleFoodLoader = async ({ params }) => {
  const { id } = params;
  try {
    const res = await axios.get(
      `https://eatsafe-server.vercel.app/food/${id}`
      // `${import.meta.env.VITE_API_URL}/food/${id}`
    );
    return res.data;
  } catch (error) {
    throw new Response("Failed to load food detail", { status: 404 });
  }
};
