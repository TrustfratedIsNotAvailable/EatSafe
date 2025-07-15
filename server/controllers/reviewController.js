const { ObjectId } = require("mongodb");
const { reviewsCollection } = require("../models");

// GET latest 3 reviews (newest first, but send in oldest-first order)
const getLatestReviews = async (req, res) => {
  try {
    const reviews = await reviewsCollection
      .find()
      .sort({ createdAt: -1 })
      .limit(3)
      .toArray();

    res.send(reviews.reverse()); // oldest-first order
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).send({ error: "Failed to fetch reviews." });
  }
};

// POST a new review
const addReview = async (req, res) => {
  const newReview = req.body;

  try {
    const result = await reviewsCollection.insertOne(newReview);
    res.send({ insertedId: result.insertedId });
  } catch (err) {
    res.status(500).send({ message: "Failed to insert review", error: err });
  }
};

// PUT: update reviews for a specific user by UID
const updateReviewsByUid = async (req, res) => {
  const { uid, name, photoURL } = req.body;

  if (!uid || !name || !photoURL) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  try {
    const result = await reviewsCollection.updateMany(
      { uid },
      { $set: { name, photoURL } }
    );

    res.send({
      message: "User reviews updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error updating reviews:", error);
    res.status(500).send({ message: "Failed to update reviews", error });
  }
};

module.exports = {
  getLatestReviews,
  addReview,
  updateReviewsByUid,
};
