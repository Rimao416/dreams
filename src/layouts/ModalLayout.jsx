import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

Modal.setAppElement("#root"); // Assurez-vous d'ajuster '#root' à votre point de montage de l'application

const ModalLayout = ({ isOpen, children, title, onClose }) => {
    console.log("La valeur est "+isOpen)
  return (
    <Modal
      isOpen={isOpen} // Par défaut ouvrez le modal
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
      
      <div className="modal-content">{children}</div>
    </Modal>
  );
};
ModalLayout.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    onClose: PropTypes.func,
    isOpen: PropTypes.bool,
  };

export default ModalLayout;
