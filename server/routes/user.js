const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const result = await req.usersCollection.find().toArray();
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
});

// Add a new user
router.post("/", async (req, res) => {
  try {
    const user = req.body;
    const result = await req.usersCollection.insertOne(user);
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to add user", error });
  }
});

// PUT
router.put("/:uid", async (req, res) => {
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

    const result = await req.usersCollection.updateOne(filter, updateDoc, options);
    res.status(200).send(result);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({ message: "Failed to upsert user", error });
  }
});

// Get a single user by UID
router.get("/:uid", async (req, res) => {
  const uid = req.params.uid;

  try {
    const user = await req.usersCollection.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error });
  }
});

module.exports = router;