const { ObjectId } = require("mongodb");
const { usersCollection } = require("../models");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const result = await usersCollection.find().toArray();
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

// Add a new user
const addUser = async (req, res) => {
  try {
    const user = req.body;
    const result = await usersCollection.insertOne(user);
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to add user", error });
  }
};

// Upsert user by UID
const upsertUser = async (req, res) => {
  const uid = req.params.uid;
  const user = req.body;

  try {
    const filter = { uid };
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        name: user.name,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      },
    };

    const result = await usersCollection.updateOne(filter, updateDoc, options);
    res.status(200).send(result);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({ message: "Failed to upsert user", error });
  }
};

// Get a single user by UID
const getUserByUid = async (req, res) => {
  const uid = req.params.uid;

  try {
    const user = await usersCollection.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error });
  }
};

module.exports = {
  getAllUsers,
  addUser,
  upsertUser,
  getUserByUid,
};
