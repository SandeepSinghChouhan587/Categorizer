// ConfirmModal.jsx
import React from "react";

const ConfirmModal = ({ isOpen, onConfirm, onCancel, message ,tittle}) => {
  if (!isOpen) return null;

  return (
    <div className=" inset-0 flex items-center justify-center  bg-opacity-50 z-50">
      <div className="bg-red-800 mt-2 rounded-lg shadow-lg p-6 w-full">
        <p className="text-gray-800 mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;