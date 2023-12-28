import React, { useState, useEffect } from 'react';
import '../css/ManagerApp.css';

function ManagerApp() {
  const [movieData, setMovieData] = useState({
    name: '',
    trailer_url: '',
    posterUrl: ''
  });

  const [tickets, setTickets] = useState([]);


  const [streamData, setStreamData] = useState({
    movieId: '',
    hallId: '',
    time: ''
  });
  const [halls, setHalls] = useState([]);
  const [movies, setMovies] = useState([]);
  
  const handleStreamChange = (event) => {
    const { name, value } = event.target;
    setStreamData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddStream = async () => {
    try {
      // Create a new stream in the database using streamData
      const response = await fetch('http://localhost:3001/api/streams/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          movieId: streamData.movieId, 
          hallId: streamData.hallId,  
          time: streamData.time
        }),
        mode: 'cors'
      });
  
      if (response.ok) {
        console.log('Stream added successfully');
        // Clear the streamData after adding
        setStreamData({ movieId: '', hallId: '', time: '' });
      } else {
        console.error('Error adding stream');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    // Fetch all tickets
    async function fetchTickets() {
      try {
        const response = await fetch('http://localhost:3001/api/Tickets');
        if (response.ok) {
          const ticketsData = await response.json();
          setTickets(ticketsData);
        } else {
          console.error('Error fetching tickets');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    // Fetch all movies
    async function fetchMovies() {
      try {
        const response = await fetch('http://localhost:3001/api/movies');
        if (response.ok) {
          const moviesData = await response.json();
          setMovies(moviesData);
        } else {
          console.error('Error fetching movies');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    // Fetch halls
  async function fetchHalls() {
    try {
      const response = await fetch('http://localhost:3001/api/Hall');
      if (response.ok) {
        const hallsData = await response.json();
        setHalls(hallsData);
      } else {
        console.error('Error fetching halls');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

    fetchTickets();
    fetchMovies();
    fetchHalls();
  }, []);



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMovieData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddMovie = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/Movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieData),
        mode: 'cors', // Try adding this
      });
  
      if (!response.ok) {
        throw new Error('Error adding movie');
      }
  
      const data = await response.json();
      console.log(data); // Print the response or handle it accordingly
  
      // Clear the input fields
      setMovieData({ name: '', trailer_url: '', posterUrl: '' });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteTicket = async (ticketId, screeningId, seatNum) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tickets/${ticketId}`, {
        method: 'DELETE',
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error('Error deleting ticket');
      }

      const seatResponse = await fetch(`http://localhost:3001/api/seats/${screeningId}/${seatNum}`, {
      method: 'DELETE',
      mode: 'cors',
    });

    if (!seatResponse.ok) {
      throw new Error('Error deleting seat');
    }

      // Remove the deleted ticket from the state
      setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== ticketId));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1 className="header">
        <span>MyCinema-Manager</span> 🎞️
      </h1>
      <div className="manager-container">
        <h2>Add a Movie:</h2>
      <div className="manager-input-container">
          <input
            type="text"
            name="name"
            placeholder="Movie Name"
            value={movieData.name}
            onChange={handleInputChange}
            className="manager-input"
          />
        </div>
        <div className="manager-input-container">
          <input
            type="text"
            name="trailer_url"
            placeholder="Trailer URL"
            value={movieData.trailer_url}
            onChange={handleInputChange}
            className="manager-input"
          />
        </div>
        <div className="manager-input-container">
          <input
            type="text"
            name="posterUrl"
            placeholder="Poster URL"
            value={movieData.posterUrl}
            onChange={handleInputChange}
            className="manager-input"
          />
        </div>
        <button className="manager-button" onClick={handleAddMovie}>Add Movie</button>
      
        <h2>Add a Stream:</h2>
      <div className="manager-input-container">
  <select
    name="movieId"
    value={streamData.movieId}
    onChange={handleStreamChange}
    className="manager-input"
  >
    <option value="">Select a Movie</option>
    {movies.map(movie => (
      <option key={movie.id} value={movie.id}>
        {movie.name}
      </option>
    ))}
  </select>
</div>
<div className="manager-input-container">
  <select
    name="hallId"
    value={streamData.hallId}
    onChange={handleStreamChange}
    className="manager-input"
  >
    <option value="">Select a Hall</option>
    {halls.map(hall => (
      <option key={hall.id} value={hall.id}>
        {hall.name}
      </option>
    ))}
  </select>
</div>
<div className="manager-input-container">
  <select
    name="time"
    value={streamData.time}
    onChange={handleStreamChange}
    className="manager-input"
  >
    <option value="">Select a Time</option>
    <option value="2023-09-22 18:00">2023-09-22 18:00</option>
    <option value="2023-09-22 22:00">2023-09-22 22:00</option>
  </select>
</div>
<button className="manager-button" onClick={handleAddStream}>Add Stream</button>
</div>
      {/* List of all tickets */}
      <div className="ticket-list">
        <h2>All Tickets:</h2>
        <ul>
          {tickets.map(ticket => (
            <li key={ticket.id}>
              Stream ID: {ticket.stream_id}, Seat Number: {ticket.seat_num}
              <button onClick={() => handleDeleteTicket(ticket.id, ticket.stream_id, ticket.seat_num)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ManagerApp;
