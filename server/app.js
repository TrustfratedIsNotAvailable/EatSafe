const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const client = require("./config/db");
const routes = require("./routes/index"); // Centralized routes

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: ['http://localhost:5173','https://eatsafe-7744e.web.app'],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Use centralized routes
app.use("/", routes);

// Home route
app.get("/", (req, res) => {
  res.send("EatSafe Server is running");
});

// MongoDB Connection
async function connectToMongo() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
connectToMongo();

module.exports = app;
