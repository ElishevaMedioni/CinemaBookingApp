// ScreeningList.js
import SeatSelectionModal from "./SeatSelectionModal";
import React, { useState, useEffect } from "react";
import "../css/screeningList.css"; 

function ScreeningList({ selectedMovie }) {
  const [screenings, setScreenings] = useState([]);
  const [selectedScreening, setSelectedScreening] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch screenings for the selected movie from your API
    const fetchScreenings = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/stream");
        const data = await response.json();
        const filteredScreenings = data.filter(
          (screening) => screening.movie_id === selectedMovie.id
        );
        setScreenings(filteredScreenings);
      } catch (error) {
        console.log("Error occurred while fetching data:", error);
        // Additional error handling if needed
      }
    };

    if (selectedMovie) {
      fetchScreenings();
    }
  }, [selectedMovie]);


  
  const handleSelectScreening = (screening) => {
    setSelectedScreening(screening);
  };

  // const handleSelectSeat = (seat) => {
  //   setSelectedSeat(seat);
  //   openModal(); // Open the modal when seat is selected
  // };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div>
      <div className="trailer">
      <iframe 
        src={`https://www.youtube.com/embed/${selectedMovie?.trailer_url}`}
        title="Trailer"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      </div>
     
      <ul>
        {screenings.map((screening) => (
          <li
            key={screening.id}
            onClick={() => handleSelectScreening(screening)}
            style={{
              fontWeight:
                selectedScreening?.id === screening.id ? "bold" : "normal",
            }}
          >
            {screening.time} - Hall {screening.hall_id}
          </li>
        ))}
      </ul>
      {selectedScreening && (
        <div>
          <button className="order_button" onClick={openModal}>
            Order Ticket</button>
          {/*Modal*/}
          {isModalOpen && (
            <div className="modal">
            <div className="modal-content">
              <SeatSelectionModal
                selectedMovie={selectedMovie}
                selectedScreening={selectedScreening}
                closeModal={closeModal}
              />
            </div>
          </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ScreeningList;