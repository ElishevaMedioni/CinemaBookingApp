import React, { useState, useEffect } from 'react';
import '../css/SeatSelection.css';
import clsx from 'clsx';



function SeatSelection({ selectedMovie, selectedScreening}) {
  
    const [availableSeats, setAvailableSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [occupiedSeats, setOccupiedSeats] = useState([]);
    const [basket, setBasket] = useState([]);
    const [purchaseConfirmed, setPurchaseConfirmed] = useState(false);
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData.id;



    useEffect(() => {
        if (selectedMovie && selectedScreening) {
          // Fetch available seats for the selected movie and screening
          fetchSeats( selectedScreening.id)
            .then((occupiedSeatNumbers) => {
              setOccupiedSeats(occupiedSeatNumbers);
              const allSeats = Array.from({ length: 8 * 8 }, (_, i) => i);
              const available = allSeats.filter(seatNum => !occupiedSeatNumbers.includes(seatNum));
              setAvailableSeats(available);
            })
            .catch((error) => {
              console.error('Error fetching occupied seats:', error);
            });
        }
      }, [selectedMovie, selectedScreening]);




const fetchSeats = async (screeningId) => {
  try {
    const response = await fetch(`http://localhost:3001/api/seats/occupied/${screeningId}`);
    const data = await response.json();
    console.log(data);
    return data;
    //return extractSeatNumbers(data);
  } catch (error) {
    console.log('Error occurred while fetching seats:', error);
    return [];
  }
};

const handleAddToBasket = async () => {
  setBasket(selectedSeats);
  setPurchaseConfirmed(true);

  // Add the selected seats to the database
  try {
    const response = await fetch('http://localhost:3001/api/seats/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        screeningId: selectedScreening.id,
        seatNumbers: selectedSeats
      }),
      mode: 'cors',
    });

    if (response.ok) {
      console.log('Selected seats added to the database successfully');

      // Create a ticket for the selected seats
      const ticketResponse = await fetch('http://localhost:3001/api/tickets/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId,
          screeningId: selectedScreening.id,
          seatNumbers: selectedSeats
        }),
        mode: 'cors',
      });

      if (ticketResponse.ok) {
        console.log('Ticket created successfully');
      } else {
        console.error('Error creating ticket');
      }
    } else {
      console.error('Error adding selected seats to the database');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};




const handleSeatClick = (seat) => 
{
  if (selectedSeats.includes(seat))
  {
    // Deselect the seat
    setSelectedSeats(selectedSeats.filter(selectedSeat => selectedSeat !== seat));
  } 
  else 
  {
    // Select the seat
    setSelectedSeats([...selectedSeats, seat]);
  }
};

  return (
    <div className="App">
      
      {purchaseConfirmed ? (
      <div className="purchase-confirmation">
        Thanks for your purchase! 🎉
        <p>🍿 Movie: {selectedMovie.name}</p>
        <p>🪑 Selected Seats: {basket.join(', ')}</p>
        <p>💰 Total: {basket.length * (selectedMovie ? selectedMovie.price : 0)}$</p>
      </div>
    ) : (
      <>
        <ShowCase />
      <Cinema 
      selectedSeats={selectedSeats} 
      availableSeats={availableSeats} 
      onSeatClick={handleSeatClick} 
      occupiedSeats={occupiedSeats} />
      <p className="info">
        You have selected <span className="count">{selectedSeats.length}</span> seats for the price of{' '}
        <span className="total">{selectedSeats.length * (selectedMovie ? selectedMovie.price : 0)}$</span>
      </p>
      <button className='add_to_basket' onClick={handleAddToBasket}> Add to Basket

    </button>
    </>
    )}
  </div>
);

}

function ShowCase() {
    return (
      <ul className="ShowCase">
        <li>
          <span className="seat" /> <small>N/A</small>
        </li>
        <li>
          <span className="seat selected" /> <small>Selected</small>
        </li>
        <li>
          <span className="seat occupied" /> <small>Occupied</small>
        </li>
      </ul>
    )
  }



function Cinema({ selectedSeats, availableSeats, occupiedSeats, onSeatClick }) {
  return (
    <div className="Cinema">
      <div className="screen" />
      <div className="seats">
        {Array.from({ length: 8 * 8 }, (_, i) => i).map(seat => {
          const isOccupied = occupiedSeats.includes(seat);
          const isSelected = selectedSeats.includes(seat);
          const isAvailable = availableSeats.includes(seat);
          const seatClassName = clsx('seat', {
            selected: isSelected,
            occupied: isOccupied,
            available: isAvailable,
          });

          return (
            <span
              key={seat}
              className={seatClassName}
              onClick={() => isAvailable && onSeatClick(seat)}
            />
          );
        })}
      </div>
    </div>
  );
}



  

export default SeatSelection;