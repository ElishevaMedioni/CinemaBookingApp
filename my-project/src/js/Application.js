// Application.js
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import MovieSelection from "./MovieSelection";
import ScreeningList from "./ScreeningList";
import "../css/application.css"; 
import ScreeningModal from "./ScreeningModal";

function Application() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) {
    // If user is not authenticated, navigate to login page
    return <Navigate to="/login" />;
  }
  const handleOpenModal = (movie) => {
    setSelectedMovie(movie); // Set the selected movie
    setIsModalOpen(true); // Open the modal
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    handleOpenModal(movie);
  };


  const handleCloseModal = () => {
    setSelectedMovie(null); // Reset selected movie
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div>
      {/* <h1 className="header">🎞️ MyCinema 🍿</h1> */}
      <h1 className="header">
        <span>MyCinema</span> 🎞️
      </h1>
      <MovieSelection onSelectMovie={handleSelectMovie} />
      {/* {selectedMovie 
      && <ScreeningList selectedMovie={selectedMovie} user={user} />} */}
      {/* Render the ScreeningModal component */}
      <ScreeningModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedMovie={selectedMovie}
        user={user} // Make sure to provide the user data
      />
    </div>
  );
}

export default Application;
