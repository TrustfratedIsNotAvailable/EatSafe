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

// Update all reviews by user uid
router.put("/update-by-uid", async (req, res) => {
  const { uid, name, photoURL } = req.body;

  if (!uid || !name || !photoURL) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  try {
    const result = await req.reviewsCollection.updateMany(
      { uid },
      {
        $set: {
          name,
          photoURL,
        },
      }
    );

    res.send({
      message: "User reviews updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error updating reviews:", error);
    res.status(500).send({ message: "Failed to update reviews", error });
  }
});


module.exports = router;
