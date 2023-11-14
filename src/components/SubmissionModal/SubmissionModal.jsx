import React from "react";
import "./submissionModal.css";
import { useNavigate } from "react-router-dom";

const SubmissionModal = ({ isOpen, message, btn }) => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
          {btn && (
            <>
              <button onClick={handleRefresh} className="btn-primary">
                Poster une nouvelle annonce
              </button>
              <button onClick={() => navigate("/")} className="btn-secondary">
                Retour à l'accueil
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionModal;
