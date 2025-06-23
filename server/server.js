const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectToDatabase = require("./config/db");

const foodRoutes = require("./routes/foodRoutes");
const notesRoutes = require("./routes/noteRoutes");
const usersRoutes = require("./routes/userRoutes");
const reviewsRoutes = require("./routes/reviewRoutes");
const recipesRoutes = require("./routes/recipeRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("EatSafe - Food Expiry Tracker server is running.");
});

// Main DB bootstrapping
connectToDatabase()
  .then(
    ({
      foodCollection,
      notesCollection,
      usersCollection,
      reviewsCollection,
    }) => {
      // Routes with injected collections
      app.use(
        "/food",
        (req, res, next) => {
          req.foodCollection = foodCollection;
          req.notesCollection = notesCollection;
          next();
        },
        foodRoutes
      );

      app.use(
        "/notes",
        (req, res, next) => {
          req.notesCollection = notesCollection;
          next();
        },
        notesRoutes
      );

      app.use(
        "/users",
        (req, res, next) => {
          req.usersCollection = usersCollection;
          next();
        },
        usersRoutes
      );

      app.use(
        "/reviews",
        (req, res, next) => {
          req.reviewsCollection = reviewsCollection;
          next();
        },
        reviewsRoutes
      );

      app.use("/recipes", recipesRoutes); // no DB injection needed
    }
  )
  .catch((err) => {
    console.error("❌ Server failed to start due to DB error:", err);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`🚀 EatSafe server is running on port ${port}`);
});
