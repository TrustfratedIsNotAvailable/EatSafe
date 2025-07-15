const client = require("../config/db");

const db = client.db("EatSafeDB");

module.exports = {
  foodCollection: db.collection("food"),
  notesCollection: db.collection("notes"),
  usersCollection: db.collection("users"),
  reviewsCollection: db.collection("reviews"),
};
