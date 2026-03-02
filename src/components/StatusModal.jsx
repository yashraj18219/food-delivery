import React from "react";

/**
 * Reusable modal for success (green) and error (red) messages.
 * @param {boolean} isOpen - Whether the modal is visible
 * @param {() => void} onClose - Callback when modal is closed (e.g. overlay click or close button)
 * @param {"success" | "error"} type - "success" (green) or "error" (red)
 * @param {string} title - Short title (e.g. "Success" or "Error")
 * @param {string} message - Main message body
 */
const StatusModal = ({ isOpen, onClose, type = "success", title, message }) => {
  if (!isOpen) return null;

  const isSuccess = type === "success";
  const bgColor = isSuccess ? "bg-green-100" : "bg-red-100";
  const borderColor = isSuccess ? "border-green-600" : "border-red-600";
  const textColor = isSuccess ? "text-green-800" : "text-red-800";
  const defaultTitle = isSuccess ? "Success" : "Error";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`max-w-md w-full mx-4 rounded-xl shadow-xl border-2 ${borderColor} ${bgColor} p-6 ${textColor}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-xl font-bold">{title || defaultTitle}</h3>
            {message && <p className="mt-2 opacity-95">{message}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`rounded-lg px-3 py-1 font-medium hover:opacity-90 ${isSuccess ? "bg-green-600" : "bg-red-600"} text-white`}
            aria-label="Close"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;
