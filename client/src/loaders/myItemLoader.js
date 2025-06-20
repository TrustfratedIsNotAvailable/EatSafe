import axios from "axios";

export const myItemLoader = async ({ request }) => {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");

  if (!email) {
    throw new Response("Email is required", { status: 400 });
  }

  try {
    const res = await axios.get(`http://localhost:3000/food?userEmail=${email}`);
    return res.data;
  } catch (err) {
    console.error("Failed to load food items:", err);
    throw new Response("Failed to load food items", { status: 500 });
  }
};
