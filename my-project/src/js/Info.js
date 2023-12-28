import React, { useState, useEffect } from 'react';
import '../css/info.css';
import profilePicture from '../Image/profileImage.png';

function Info() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [userTickets, setUserTickets] = useState([]);

  useEffect(() => {
    // Fetch user's tickets based on user ID
    async function fetchUserTickets() {
      try {
        const response = await fetch(`http://localhost:3001/api/tickets/user/${user.id}`);
        if (response.ok) {
          const ticketsData = await response.json();
          setUserTickets(ticketsData);
        } else {
          console.error('Error fetching user tickets');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchUserTickets();
  }, [user.id]);

  return (
    <div className="profile">
      <div className="profile-picture">
        <img src={profilePicture} alt="Profile Picture" />
      </div>
      <div className="profile-info">
        {/* User details */}
        <p>Username: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        {/* List of user's tickets */}
        <div className="profile-tickets">
          <h2>Your Tickets:</h2>
          <ul>
            {userTickets.map(ticket => (
              <li key={ticket.id}>
                Stream ID: {ticket.stream_id}, Seat Number: {ticket.seat_num}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
  
  
}

export default Info;
