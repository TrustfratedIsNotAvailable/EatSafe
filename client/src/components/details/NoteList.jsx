import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import NoteItem from "../notelist/NoteItem";
import NoteEditorModal from "../notelist/NoteEditorModal";

const NoteList = ({ foodId, isOwner, notes, onNoteDeleted, user }) => {
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
      await axios.put(`http://localhost:3000/notes/like/${noteId}`, {
        userEmail,
      });

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
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/notes/${id}`);
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
      await axios.put(`http://localhost:3000/notes/${editingNote._id}`, {
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
      <h3 className="text-xl font-semibold mt-2 mb-3">Notes</h3>

      {notes.length === 0 ? (
        <p className="text-gray-500">No notes yet.</p>
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
        />
      )}
    </div>
  );
};

export default NoteList;
