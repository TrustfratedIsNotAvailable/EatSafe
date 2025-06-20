import React from "react";
import { FaTrash, FaEdit, FaHeart, FaRegHeart } from "react-icons/fa";

const NoteItem = ({
  note,
  userEmail,
  isOwner,
  onLikeToggle,
  onEdit,
  onDelete,
  likedByUser,
  likeCount,
}) => {
  const formatDate = (isoString) => {
    if (!isoString) return "";
    return new Date(isoString).toLocaleString();
  };

  return (
    <li className="p-4 shadow-sm bg-white relative rounded-lg">
      <p className="mb-2">{note.text}</p>
      <small className="text-gray-400 block italic mb-3">
        {note.updatedDate
          ? `Edited on: ${formatDate(note.updatedDate)}`
          : `Posted on: ${formatDate(note.postedDate)}`}
      </small>

      <div className="absolute bottom-2 left-3 flex items-center gap-2">
        <button className="text-red-600" onClick={() => onLikeToggle(note._id)}>
          {likedByUser ? <FaHeart /> : <FaRegHeart />}
        </button>
        <span className="text-sm text-gray-700">{likeCount}</span>
      </div>

      {isOwner && (
        <div className="absolute bottom-2 right-3 flex gap-3">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => onEdit(note)}
            title="Edit Note"
          >
            <FaEdit />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => onDelete(note._id)}
            title="Delete Note"
          >
            <FaTrash />
          </button>
        </div>
      )}
    </li>
  );
};

export default NoteItem;
