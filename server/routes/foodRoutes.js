//routes/foodRoutes.js
const express = require("express");
const router = express.Router();
const foodCtrl = require("../controllers/foodController");
const verifyToken=require("../middlewares/verifyToken")

router.get("/", foodCtrl.getAllFoods);
router.get("/:id", foodCtrl.getSingleFood);
router.post("/",verifyToken, foodCtrl.addFood);
router.put("/:id",verifyToken, foodCtrl.updateFood);
router.delete("/:id",verifyToken, foodCtrl.deleteFood);

module.exports = router;
