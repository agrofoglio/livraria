import React from 'react';
import '../css/ConfirmDeleteModal.css';
const ConfirmDeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Tem certeza que deseja excluir este livro?</h3>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="confirm-button">Sim</button>
          <button onClick={onCancel} className="cancel-button">Não</button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmDeleteModal;