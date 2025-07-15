//routes/reviewRoutes.js
const express = require("express");
const router = express.Router();
const reviewCtrl = require("../controllers/reviewController");

// Routes
router.get("/", reviewCtrl.getLatestReviews);
router.post("/", reviewCtrl.addReview);
router.put("/update-by-uid", reviewCtrl.updateReviewsByUid);

module.exports = router;
