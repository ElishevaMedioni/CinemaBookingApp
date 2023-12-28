// MovieDetails.js
import React from "react";

function MovieDetails({ selectedMovie }) {
  return (
    <div>
      <h3>{selectedMovie.name}</h3>
      {selectedMovie.trailer_url && (
        <iframe
          width="560"
          height="315"
          src={selectedMovie.trailer_url}
          title="Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}

export default MovieDetails;
