const { ObjectId } = require("mongodb");

exports.getNotes = async (req, res) => {
  const { foodId } = req.query;
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
};

exports.addNote = async (req, res) => {
  const newNote = req.body;

  try {
    const result = await req.notesCollection.insertOne(newNote);
    res.send({ insertedId: result.insertedId });
  } catch (err) {
    res.status(500).send({ message: "Failed to insert note", error: err });
  }
};

exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const updatedNote = req.body;

  try {
    const result = await req.notesCollection.updateOne(
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

exports.deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await req.notesCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount > 0) {
      res.send({ success: true, message: "Note deleted successfully" });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete note", error });
  }
};

exports.toggleLike = async (req, res) => {
  const { id } = req.params;
  const { userEmail } = req.body;

  try {
    const note = await req.notesCollection.findOne({ _id: new ObjectId(id) });

    if (!note) return res.status(404).send({ message: "Note not found" });

    if (!note.likes) {
      note.likes = [];
      await req.notesCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { likes: [] } }
      );
    }

    const alreadyLiked = note.likes.includes(userEmail);
    const update = alreadyLiked
      ? { $pull: { likes: userEmail } }
      : { $addToSet: { likes: userEmail } };

    await req.notesCollection.updateOne({ _id: new ObjectId(id) }, update);

    res.send({ success: true, liked: !alreadyLiked });
  } catch (err) {
    console.error("Error toggling like:", err);
    res.status(500).send({ message: "Failed to toggle like", error: err });
  }
};
