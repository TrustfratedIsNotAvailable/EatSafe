
import React, { useState } from "react";
import axios from "axios";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { useTheme } from "../../hooks/ThemeContext"; 

const NoteInput = ({ foodId, isOwner, user, onNoteAdded }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
      await axios.post("https://eatsafe-server.vercel.app/notes", newNote);
      setNoteText("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
      onNoteAdded();
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  return (
    <div className={`mt-6 ${isDark ? "text-gray-300" : "text-gray-800"}`}>
      <h3 className="text-lg font-semibold mb-3">Add a Note</h3>

      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Write your note here..."
        className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2
          ${
            isDark
              ? "bg-gray-800 border-gray-600 text-gray-200 focus:ring-green-500"
              : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500"
          }`}
        rows={4}
        disabled={!isOwner}
      />

      <button
        onClick={handleAddNote}
        disabled={!isOwner || !noteText.trim()}
        className={`mt-3 w-full py-2 font-medium rounded-md transition-colors duration-200
          ${
            isOwner && noteText.trim()
              ? isDark
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
              : isDark
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
      >
        Add Note
      </button>

      {success && (
        <div
          className={`flex items-center mt-3 text-sm ${
            isDark ? "text-green-400" : "text-green-600"
          }`}
        >
          <CheckCircle className="w-4 h-4 mr-1" />
          Note added successfully!
        </div>
      )}

      {!isOwner && (
        <div
          className={`flex items-center mt-3 text-sm ${
            isDark ? "text-red-400" : "text-red-500"
          }`}
        >
          <AlertTriangle className="w-4 h-4 mr-1" />
          You are not the owner of this item. Only the person who added the food
          can leave notes.
        </div>
      )}
    </div>
  );
};

export default NoteInput;
