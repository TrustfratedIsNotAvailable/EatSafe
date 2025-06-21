const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

//get all
router.get("/", async (req, res) => {
  try {
    // last 3 reviews sorted by createdAt desc
    const reviews = await req.reviewsCollection
      .find()
      .sort({ createdAt: -1 }) // latest first
      .limit(3)
      .toArray();

    res.send(reviews.reverse());
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).send({ error: "Failed to fetch reviews." });
  }
});

//add
router.post("/", async (req, res) => {
  const newReview = req.body;
  try {
    const result = await req.reviewsCollection.insertOne(newReview);
    res.send({ insertedId: result.insertedId });
  } catch (err) {
    res.status(500).send({ message: "Failed to insert review", error: err });
  }
});

module.exports = router;
