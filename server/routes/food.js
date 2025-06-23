const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const calculateStatus = require("../utils/calculateStatus");

//get all
// router.get("/", async (req, res) => {
//   try {
//     const query = {};
//     if (req.query.userEmail) {
//       query.userEmail = req.query.userEmail;
//     }

//     const foods = await req.foodCollection.find(query).toArray();

//     // Recalculate status before sending
//     const updatedFoods = foods.map((food) => ({
//       ...food,
//       status: calculateStatus(food.expiryDate),
//     }));

//     res.send(updatedFoods);
//   } catch (error) {
//     console.error("Error fetching food items:", error);
//     res.status(500).send({ error: "Failed to fetch food items." });
//   }
// });
router.get("/", async (req, res) => {
  try {
    const matchStage = {};
    if (req.query.userEmail) {
      matchStage.userEmail = req.query.userEmail;
    }

    const foods = await req.foodCollection
      .aggregate([
        { $match: matchStage },
        {
          $lookup: {
            from: "users",
            localField: "userEmail",
            foreignField: "email",
            as: "userInfo",
          },
        },
        {
          $unwind: {
            path: "$userInfo",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            title: 1,
            category: 1,
            quantity: 1,
            expiryDate: 1,
            description: 1,
            addedDate: 1,
            userEmail: 1,
            uid: 1,
            foodImage: 1,
            status: 1,
            "userInfo.name": 1,
            "userInfo.photoURL": 1,
          },
        },
      ])
      .toArray();

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
// router.get("/:id", async (req, res) => {
//   const id = req.params.id;
//   const query = { _id: new ObjectId(id) };
//   const food = await req.foodCollection.findOne(query);

//   if (!food) {
//     return res.status(404).json({ message: "Food not found" });
//   }

//   // Recalculate status
//   food.status = calculateStatus(food.expiryDate);
//   res.json(food);
// });

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const foods = await req.foodCollection
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
        {
          $lookup: {
            from: "users",
            localField: "userEmail",
            foreignField: "email",
            as: "userInfo",
          },
        },
        {
          $unwind: {
            path: "$userInfo",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            title: 1,
            category: 1,
            quantity: 1,
            expiryDate: 1,
            description: 1,
            addedDate: 1,
            userEmail: 1,
            uid: 1,
            foodImage: 1,
            status: 1,
            "userInfo.name": 1,
            "userInfo.photoURL": 1,
          },
        },
      ])
      .toArray();

    const food = foods[0];

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    // Recalculate status
    food.status = calculateStatus(food.expiryDate);

    res.json(food);
  } catch (error) {
    console.error("Error fetching food by ID:", error);
    res.status(500).json({ message: "Failed to fetch food item", error });
  }
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
    // Delete the food item
    const result = await req.foodCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount > 0) {
      // Delete all notes related to this food item
      const noteDeleteResult = await req.notesCollection.deleteMany({ foodId: id });

      console.log(`Deleted food item ${id} and ${noteDeleteResult.deletedCount} related notes.`);

      res.send({
        success: true,
        message: `Food and ${noteDeleteResult.deletedCount} related notes deleted successfully.`,
      });
    } else {
      res.status(404).json({ message: "Food not found" });
    }
  } catch (error) {
    console.error("Failed to delete food and notes:", error);
    res.status(500).json({ message: "Failed to delete food and notes", error });
  }
});

module.exports = router;
