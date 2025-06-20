const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const calculateStatus = require("../utils/calculateStatus");

//get all
router.get("/", async (req, res) => {
  try {
    const query = {};
    if (req.query.userEmail) {
      query.userEmail = req.query.userEmail;
    }

    const foods = await req.foodCollection.find(query).toArray();

    // Recalculate status before sending
    const updatedFoods = foods.map((food) => ({
      ...food,
      status: calculateStatus(food.expiryDate),
    }));

    res.send(updatedFoods);
  } catch (error) {
    console.error("Error fetching food items:", error);
    res.status(500).send({ error: "Failed to fetch food items." });
  }
});

//get single
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const food = await req.foodCollection.findOne(query);

  if (!food) {
    return res.status(404).json({ message: "Food not found" });
  }

  // Recalculate status
  food.status = calculateStatus(food.expiryDate);
  res.json(food);
});

//add new
router.post("/", async (req, res) => {
  const newFood = req.body;

  // Calculate status before
  newFood.status = calculateStatus(newFood.expiryDate);

  const result = await req.foodCollection.insertOne(newFood);
  res.send(result);
});

// Update
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  // Recalculate status
  if (updatedData.expiryDate) {
    updatedData.status = calculateStatus(updatedData.expiryDate);
  }

  try {
    const result = await req.foodCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (result.modifiedCount > 0) {
      res.send({ success: true, message: "Food updated successfully" });
    } else {
      res.status(404).json({ message: "Food not found or data unchanged" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update food", error });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await req.foodCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount > 0) {
      res.send({ success: true, message: "Food deleted successfully" });
    } else {
      res.status(404).json({ message: "Food not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete food", error });
  }
});

module.exports = router;
