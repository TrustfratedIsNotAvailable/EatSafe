//routes/foodRoutes.js
const express = require("express");
const router = express.Router();
const foodCtrl = require("../controllers/foodController");

router.get("/", foodCtrl.getAllFoods);
router.get("/:id", foodCtrl.getSingleFood);
router.post("/", foodCtrl.addFood);
router.put("/:id", foodCtrl.updateFood);
router.delete("/:id", foodCtrl.deleteFood);

module.exports = router;
