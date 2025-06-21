import axios from "axios";

export const foodLoader = async () => {
  try {
    const res = await axios.get(
      "https://eatsafe-server.vercel.app/food"
      // `${import.meta.env.VITE_API_URL}/food`
    );
    return res.data;
  } catch (error) {
    throw new Response("Failed to load food items", { status: 500 });
  }
};
