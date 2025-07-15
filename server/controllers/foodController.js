const { ObjectId } = require("mongodb");
const calculateStatus = require("../utils/calculateStatus");
const {
  foodCollection,
  notesCollection,
} = require("../models");

// GET all foods
const getAllFoods = async (req, res) => {
  try {
    const matchStage = {};
    if (req.query.userEmail) {
      matchStage.userEmail = req.query.userEmail;
    }

    const foods = await foodCollection.aggregate([
      { $match: matchStage },
      {
        $lookup: {
          from: "users",
          localField: "userEmail",
          foreignField: "email",
          as: "userInfo",
        },
      },
      { $unwind: { path: "$userInfo", preserveNullAndEmptyArrays: true } },
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
    ]).toArray();

    const updatedFoods = foods.map((food) => ({
      ...food,
      status: calculateStatus(food.expiryDate),
    }));

    res.send(updatedFoods);
  } catch (error) {
    console.error("Error fetching food items:", error);
    res.status(500).send({ error: "Failed to fetch food items." });
  }
};

// GET single food
const getSingleFood = async (req, res) => {
  const id = req.params.id;
  try {
    const foods = await foodCollection.aggregate([
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: "users",
          localField: "userEmail",
          foreignField: "email",
          as: "userInfo",
        },
      },
      { $unwind: { path: "$userInfo", preserveNullAndEmptyArrays: true } },
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
    ]).toArray();

    const food = foods[0];
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    food.status = calculateStatus(food.expiryDate);
    res.json(food);
  } catch (error) {
    console.error("Error fetching food by ID:", error);
    res.status(500).json({ message: "Failed to fetch food item", error });
  }
};

// ADD food
const addFood = async (req, res) => {
  const newFood = req.body;
  newFood.status = calculateStatus(newFood.expiryDate);

  const result = await foodCollection.insertOne(newFood);
  res.send(result);
};

// UPDATE food
const updateFood = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  if (updatedData.expiryDate) {
    updatedData.status = calculateStatus(updatedData.expiryDate);
  }

  try {
    const result = await foodCollection.updateOne(
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
};

// DELETE food and related notes
const deleteFood = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await foodCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount > 0) {
      const noteDeleteResult = await notesCollection.deleteMany({ foodId: id });

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
};

module.exports={
  getAllFoods,
  getSingleFood,
  addFood,
  updateFood ,
deleteFood
}