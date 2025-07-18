import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import NoteItem from "../notelist/NoteItem";
import NoteEditorModal from "../notelist/NoteEditorModal";
import { useTheme } from "../../hooks/ThemeContext";
import { handleDeleteNote } from "../../utils/deleteNote";
import api from "../../api/api";


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
      await api.put(
        `/notes/like/${noteId}`,
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

  const handleUpdateNote = async () => {
    try {
      await api.put(
        `/notes/${editingNote._id}`,
        {
          text: editText,
          updatedDate: new Date().toISOString(),
        }
      );
      toast.success("Note updated.");
      setEditingNote(null);
      setEditText("");
      onNoteDeleted();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update note.");
    }
  };

  const onDeleteNote = async (id) => {
    const deleted = await handleDeleteNote(id, isDark);
    if (deleted) {
      onNoteDeleted();
    }
  };

  return (
    <div>
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
              onDelete={onDeleteNote}
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
