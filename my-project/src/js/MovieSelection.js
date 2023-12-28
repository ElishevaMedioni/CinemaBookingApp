// MovieSelection.js
import React, { useState, useEffect } from "react";
import "../css/MovieSelection.css"; // Import the CSS file

function MovieSelection({ onSelectMovie }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch movies from your API
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/movies");
        const data = await response.json();
        setMovies(data);
        setLoading(false);
      } catch (error) {
        console.log("Error occurred while fetching data:", error);
        setLoading(false);
        // Additional error handling if needed
      }
    };

    fetchMovies();
  }, []);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    onSelectMovie(movie);
  };

  return (
    <div>
      <h2 className="h2title">Choose a Movie:</h2>
      <div className="movie-selection-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleSelectMovie(movie)}
              className={`movie-card ${
                selectedMovie?.id === movie.id ? "selected" : ""
              }`}
            >
              <img
                src={movie.posterUrl}
                alt={movie.name}
                className="movie-poster"
              />
              <div className="movie-details">
                <p>{movie.name}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MovieSelection;

