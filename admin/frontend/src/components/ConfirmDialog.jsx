import { AlertTriangle } from "lucide-react";

function ConfirmDialog({ title, message, confirmLabel = "Delete", onCancel, onConfirm }) {

  return (
    <div className="modal-overlay" onClick={onCancel}>

      <div
        className="modal-panel confirm-panel"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="confirm-icon">
          <AlertTriangle size={26} />
        </div>

        <h2>{title}</h2>

        <p>{message}</p>

        <div className="modal-actions confirm-actions">

          <button
            type="button"
            className="btn btn-outline"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ConfirmDialog;
