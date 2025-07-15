import api from "../api/api";

export const foodLoader = async () => {
  try {
    const res = await api.get("/food");
    return res.data;
  } catch (error) {
    throw new Response("Failed to load food items", { status: 500 });
  }
};
