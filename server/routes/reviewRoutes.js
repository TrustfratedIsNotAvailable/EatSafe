//routes/reviewRoutes.js
const express = require("express");
const router = express.Router();
const reviewCtrl = require("../controllers/reviewController");
const verifyToken=require("../middlewares/verifyToken")

// Routes
router.get("/",reviewCtrl.getLatestReviews);
router.post("/",verifyToken, reviewCtrl.addReview);
router.put("/update-by-uid",verifyToken, reviewCtrl.updateReviewsByUid);

module.exports = router;
