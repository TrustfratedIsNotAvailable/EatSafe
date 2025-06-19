const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();

router.get("/", async (req, res) => {
  const { foodId, user } = req.query;

  const query = {};
  if (foodId) {
    query.foodId = foodId;
  }

  try {
    const notes = await req.notesCollection.find(query).toArray();
    res.send(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).send({ error: "Failed to fetch notes." });
  }
});

//add
router.post("/", async (req, res) => {
  const newNote = req.body;
  try {
    const result = await req.notesCollection.insertOne(newNote);
    res.send({ insertedId: result.insertedId });
  } catch (err) {
    res.status(500).send({ message: "Failed to insert note", error: err });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await req.notesCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount > 0) {
      res.send({ success: true, message: "notes deleted successfully" });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete note", error });
  }
});

module.exports = router;