import React from "react";
import SeatSelection from "./SeatSelection";

function SeatSelectionModal({
  selectedMovie,
  selectedScreening,
  selectedSeat,
  closeModal
}) {
  return (
    <div>
      <span className="close" onClick={closeModal}>
        &times;
      </span>
      {/* Render the SeatSelection component with the selected movie and screening */}
      <SeatSelection
        selectedMovie={selectedMovie}
        selectedScreening={selectedScreening}
      />
    </div>
  );
}

export default SeatSelectionModal;
