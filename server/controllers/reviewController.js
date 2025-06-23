const { ObjectId } = require("mongodb");

// GET latest 3 reviews (reversed to oldest-first display)
exports.getLatestReviews = async (req, res) => {
  try {
    const reviews = await req.reviewsCollection
      .find()
      .sort({ createdAt: -1 }) // newest first
      .limit(3)
      .toArray();

    res.send(reviews.reverse()); // send in oldest-first order
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).send({ error: "Failed to fetch reviews." });
  }
};

// POST a new review
exports.addReview = async (req, res) => {
  const newReview = req.body;
  try {
    const result = await req.reviewsCollection.insertOne(newReview);
    res.send({ insertedId: result.insertedId });
  } catch (err) {
    res.status(500).send({ message: "Failed to insert review", error: err });
  }
};

// PUT update reviews by UID
exports.updateReviewsByUid = async (req, res) => {
  const { uid, name, photoURL } = req.body;

  if (!uid || !name || !photoURL) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  try {
    const result = await req.reviewsCollection.updateMany(
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
