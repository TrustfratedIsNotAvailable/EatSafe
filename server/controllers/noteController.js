const { ObjectId } = require("mongodb");
const { notesCollection } = require("../models");

// GET notes (optionally filtered by foodId)
const getNotes = async (req, res) => {
  const { foodId } = req.query;
  const query = foodId ? { foodId } : {};

  try {
    const notes = await notesCollection.find(query).toArray();
    res.send(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).send({ error: "Failed to fetch notes." });
  }
};

// ADD new note
const addNote = async (req, res) => {
  const newNote = req.body;

  try {
    const result = await notesCollection.insertOne(newNote);
    res.send({ insertedId: result.insertedId });
  } catch (err) {
    res.status(500).send({ message: "Failed to insert note", error: err });
  }
};

// UPDATE a note
const updateNote = async (req, res) => {
  const { id } = req.params;
  const updatedNote = req.body;

  try {
    const result = await notesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedNote }
    );

    if (result.modifiedCount > 0) {
      res.send({ success: true, message: "Note updated successfully" });
    } else {
      res.status(404).json({ message: "Note not found or unchanged" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update note", error });
  }
};

// DELETE a note
const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await notesCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount > 0) {
      res.send({ success: true, message: "Note deleted successfully" });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete note", error });
  }
};

// TOGGLE like/unlike on a note
const toggleLike = async (req, res) => {
  const { id } = req.params;
  const { userEmail } = req.body;

  try {
    const note = await notesCollection.findOne({ _id: new ObjectId(id) });

    if (!note) return res.status(404).send({ message: "Note not found" });

    // Initialize 'likes' array if missing
    if (!note.likes) {
      note.likes = [];
      await notesCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { likes: [] } }
      );
    }

    const alreadyLiked = note.likes.includes(userEmail);
    const update = alreadyLiked
      ? { $pull: { likes: userEmail } }
      : { $addToSet: { likes: userEmail } };

    await notesCollection.updateOne({ _id: new ObjectId(id) }, update);

    res.send({ success: true, liked: !alreadyLiked });
  } catch (err) {
    console.error("Error toggling like:", err);
    res.status(500).send({ message: "Failed to toggle like", error: err });
  }
};

module.exports = {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
  toggleLike,
};
