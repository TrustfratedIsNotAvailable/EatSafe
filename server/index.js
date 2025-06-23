const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const foodRoutes = require("./routes/food");
const notesRoutes = require("./routes/note");
const usersRoutes = require("./routes/user");
const reviewsRoutes = require("./routes/review");
const recipesRoutes = require("./routes/recipe");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4fqbakf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const foodCollection = client.db("EatSafeDB").collection("food");
    const notesCollection = client.db("EatSafeDB").collection("notes");
    const usersCollection = client.db("EatSafeDB").collection("users");
    const reviewsCollection = client.db("EatSafeDB").collection("reviews");

    // Inject collection
    //food route
    app.use(
      "/food",
      (req, res, next) => {
        req.foodCollection = foodCollection;
        req.notesCollection = notesCollection;
        next();
      },
      foodRoutes
    );

    //notes route
    app.use(
      "/notes",
      (req, res, next) => {
        req.notesCollection = notesCollection;
        next();
      },
      notesRoutes
    );

    //users route
    app.use(
      "/users",
      (req, res, next) => {
        req.usersCollection = usersCollection;
        next();
      },
      usersRoutes
    );

    //reviews route
    app.use(
      "/reviews",
      (req, res, next) => {
        req.reviewsCollection = reviewsCollection;
        next();
      },
      reviewsRoutes
    );

    //recipes route
    app.use("/recipes", recipesRoutes);

    app.get("/", (req, res) => {
      res.send("EatSafe-food expired tracker server is working.");
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`EatSafe-Food Expired Tracker server is running on port ${port}`);
});
