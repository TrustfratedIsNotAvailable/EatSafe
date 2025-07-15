import axios from "axios";

const api = axios.create({
  baseURL: "https://eatsafe-server.vercel.app",
});

export default api;
