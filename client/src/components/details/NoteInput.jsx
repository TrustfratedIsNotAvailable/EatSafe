import React, { useState } from "react";
import axios from "axios";
import { CheckCircle, AlertTriangle } from "lucide-react";

const NoteInput = ({ foodId, isOwner, user, onNoteAdded }) => {
  const [noteText, setNoteText] = useState("");
  const [success, setSuccess] = useState(false);

  const handleAddNote = async () => {
    if (!noteText.trim()) return;

    const newNote = {
      foodId,
      text: noteText,
      postedDate: new Date().toISOString().split("T")[0],
      user: user.email,
    };

    try {
      await axios.post("http://localhost:3000/notes", newNote);
      setNoteText("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
      onNoteAdded(); // Refresh notes
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Add a Note</h3>

      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Write your note here..."
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
        disabled={!isOwner}
      />

      <button
        onClick={handleAddNote}
        disabled={!isOwner || !noteText.trim()}
        className={`mt-3 w-full py-2 font-medium rounded-md transition-colors duration-200
          ${
            isOwner && noteText.trim()
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
      >
        Add Note
      </button>

      {success && (
        <div className="flex items-center text-green-600 mt-3 text-sm">
          <CheckCircle className="w-4 h-4 mr-1" />
          Note added successfully!
        </div>
      )}

      {!isOwner && (
        <div className="flex items-center text-red-500 mt-3 text-sm">
          <AlertTriangle className="w-4 h-4 mr-1" />
          You are not the owner of this item. Only the person who added the food
          can leave notes.
        </div>
      )}
    </div>
  );
};

export default NoteInput;
