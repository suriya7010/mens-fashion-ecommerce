
import React from "react";
import "./ConfirmModal.css";

function ConfirmModal({ productName, onConfirm, onCancel }) {
  return (
    // Backdrop — clicking it cancels
    <div className="modal-backdrop" onClick={onCancel}>
      {/* Stop click from bubbling to backdrop */}
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">🗑️</div>
        <h2 className="modal-title">Delete product?</h2>
        <p className="modal-message">
          <strong>"{productName}"</strong> will be permanently removed from
          MongoDB. This cannot be undone.
        </p>
        <div className="modal-actions">
          <button className="modal-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="modal-confirm" onClick={onConfirm}>
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
