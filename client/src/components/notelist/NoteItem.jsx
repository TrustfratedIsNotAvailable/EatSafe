import React from "react";
import { FaTrash, FaEdit, FaHeart, FaRegHeart } from "react-icons/fa";
import { useTheme } from "../../hooks/ThemeContext";

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
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const formatDate = (isoString) => {
    if (!isoString) return "";
    return new Date(isoString).toLocaleString();
  };

  return (
    <li
      className={`p-4 relative rounded-lg shadow-sm ${
        isDark ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <p className="mb-2">{note.text}</p>

      <small
        className={`block italic mb-3 ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {note.updatedDate
          ? `Edited on: ${formatDate(note.updatedDate)}`
          : `Posted on: ${formatDate(note.postedDate)}`}
      </small>

      <div className="absolute bottom-2 left-3 flex items-center gap-2">
        <button
          className={`${
            likedByUser
              ? "text-red-500"
              : isDark
              ? "text-gray-300"
              : "text-gray-600"
          } hover:text-red-600`}
          onClick={() => onLikeToggle(note._id)}
          title={likedByUser ? "Unlike" : "Like"}
        >
          {likedByUser ? <FaHeart /> : <FaRegHeart />}
        </button>
        <span
          className={`${isDark ? "text-gray-300" : "text-gray-700"} text-sm`}
        >
          {likeCount}
        </span>
      </div>

      {isOwner && (
        <div className="absolute bottom-2 right-3 flex gap-3">
          <button
            className={`hover:text-blue-400 ${
              isDark ? "text-blue-300" : "text-blue-500 hover:text-blue-700"
            }`}
            onClick={() => onEdit(note)}
            title="Edit Note"
          >
            <FaEdit />
          </button>
          <button
            className={`hover:text-red-600 ${
              isDark ? "text-red-400" : "text-red-500 hover:text-red-700"
            }`}
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
