import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import NoteItem from "../notelist/NoteItem";
import NoteEditorModal from "../notelist/NoteEditorModal";
import { useTheme } from "../../hooks/ThemeContext";

const NoteList = ({ foodId, isOwner, notes, onNoteDeleted, user }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [editingNote, setEditingNote] = useState(null);
  const [editText, setEditText] = useState("");
  const [likes, setLikes] = useState({});
  const userEmail = user?.email;

  useEffect(() => {
    const initialLikes = {};
    notes.forEach((note) => {
      initialLikes[note._id] = note.likes || [];
    });
    setLikes(initialLikes);
  }, [notes]);

  const handleLikeToggle = async (noteId) => {
    try {
      await axios.put(
        `https://eatsafe-server.vercel.app/notes/like/${noteId}`,
        { userEmail }
      );

      setLikes((prev) => {
        const liked = prev[noteId]?.includes(userEmail);
        const updated = liked
          ? prev[noteId].filter((email) => email !== userEmail)
          : [...(prev[noteId] || []), userEmail];

        return { ...prev, [noteId]: updated };
      });
    } catch (err) {
      console.error("Like error:", err);
      toast.error("Failed to toggle like.");
    }
  };

  const handleDeleteNote = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the note.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      background: isDark ? "#1a1a1a" : "#fff",
      color: isDark ? "#f0f0f0" : "#000",
      confirmButtonColor: "#388E3C",
      cancelButtonColor: "#d33",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`https://eatsafe-server.vercel.app/notes/${id}`);
        toast.success("Note deleted.");
        onNoteDeleted();
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete note.");
      }
    }
  };

  const handleUpdateNote = async () => {
    try {
      await axios.put(`https://eatsafe-server.vercel.app/notes/${editingNote._id}`, {
        text: editText,
        updatedDate: new Date().toISOString(),
      });
      toast.success("Note updated.");
      setEditingNote(null);
      setEditText("");
      onNoteDeleted();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update note.");
    }
  };

  return (
    <div>
      <h3
        className={`text-xl font-semibold mt-2 mb-3 ${
          isDark ? "text-gray-300" : "text-gray-900"
        }`}
      >
        Notes
      </h3>

      {notes.length === 0 ? (
        <p className={isDark ? "text-gray-400" : "text-gray-500"}>
          No notes yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {notes.map((note) => (
            <NoteItem
              key={note._id}
              note={note}
              isOwner={isOwner}
              userEmail={userEmail}
              onLikeToggle={handleLikeToggle}
              onEdit={(n) => {
                setEditingNote(n);
                setEditText(n.text);
              }}
              onDelete={handleDeleteNote}
              likedByUser={likes[note._id]?.includes(userEmail)}
              likeCount={likes[note._id]?.length || 0}
              theme={theme}
            />
          ))}
        </ul>
      )}

      {editingNote && (
        <NoteEditorModal
          text={editText}
          setText={setEditText}
          onCancel={() => setEditingNote(null)}
          onSave={handleUpdateNote}
          theme={theme}
        />
      )}
    </div>
  );
};

export default NoteList;
