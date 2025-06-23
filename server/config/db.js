// config/db.js
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4fqbakf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    const db = client.db("EatSafeDB");

    return {
      foodCollection: db.collection("food"),
      notesCollection: db.collection("notes"),
      usersCollection: db.collection("users"),
      reviewsCollection: db.collection("reviews"),
    };
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    throw error;
  }
};

module.exports = connectToDatabase;
