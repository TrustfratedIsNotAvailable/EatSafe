import React from "react";
import { useTheme } from "../../hooks/ThemeContext";

const NoteEditorModal = ({ text, setText, onCancel, onSave }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
      <div
        className={`p-6 w-full max-w-md rounded shadow-lg ${
          isDark
            ? "bg-gray-800 text-white shadow-green-700"
            : "bg-white text-black shadow-[#43AF50]"
        }`}
      >
        <h3 className="text-lg font-semibold mb-3">Edit Note</h3>

        <textarea
          className={`w-full mb-2 rounded px-4 py-2 border focus:outline-none focus:ring-1 ${
            isDark
              ? "bg-gray-900 border-gray-600 text-white focus:ring-green-400"
              : "bg-white border-gray-300 text-black focus:ring-[#1B5E20]"
          }`}
          rows={4}
          maxLength={500}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <p
          className={`text-right text-sm mb-4 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {text.length}/500 characters
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className={`px-4 py-2 rounded ${
              isDark
                ? "bg-gray-600 hover:bg-gray-500 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className={`px-4 py-2 rounded ${
              isDark
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteEditorModal;
