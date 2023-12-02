import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Assurez-vous d'ajuster '#root' à votre point de montage de l'application

const ModalLayout = ({ children, title, onClose }) => {
  return (
    <Modal
      isOpen={true} // Par défaut ouvrez le modal
      onRequestClose={onClose}
      contentLabel={title || "Modal"}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        },
        content: {
          zIndex: 1000, // Valeur de z-index appropriée pour être au-dessus des autres éléments
          width: "50%",
          margin: "auto",
          // height: "1300px",
        },
      }}
    >
      <div className="modal-header">
        <h2>{title}</h2>
        <button onClick={onClose}>Fermer</button>
      </div>
      <div className="modal-content">{children}</div>
    </Modal>
  );
};

export default ModalLayout;
