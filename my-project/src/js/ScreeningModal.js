import React from "react";
import Modal from "react-modal";
import ScreeningList from "./ScreeningList"; // Make sure to import the ScreeningList component
import "../css/ScreeningModal.css";

function ScreeningModal({ isOpen, onClose, selectedMovie, user }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Screening Modal"
    >
      {selectedMovie ? (
        <div>
          <h2>Screening List for {selectedMovie.name}</h2>
          <ScreeningList selectedMovie={selectedMovie} user={user} />
          <button className="close_button" onClick={onClose}>Close</button>
        </div>
      ) : (
        <p>No movie selected.</p>
      )}
    </Modal>
  );
}

export default ScreeningModal;
