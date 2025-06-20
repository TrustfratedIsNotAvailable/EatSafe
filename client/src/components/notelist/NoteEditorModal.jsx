import React from "react";

const NoteEditorModal = ({ text, setText, onCancel, onSave }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white p-6 shadow-lg shadow-[#43AF50] w-full max-w-md rounded">
        <h3 className="text-lg font-semibold mb-3">Edit Note</h3>
        <textarea
          className="w-full mb-2 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#1B5E20]"
          rows={4}
          maxLength={500}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <p className="text-right text-sm text-gray-500 mb-4">
          {text.length}/500 characters
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteEditorModal;
