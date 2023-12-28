const express = require('express');
const router = express.Router();

module.exports = (con) => {
  // Route to get seat data for a specific screening by its ID
  router.get('/seats/:screeningId', (req, res) => {
    const screeningId = req.params.screeningId;
    const query = 'SELECT * FROM Seats WHERE screening_id = ?';
    
    con.query(query, [screeningId], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error fetching seat data for the specified screening' });
      } else {
        res.json(results);
      }
    });
  });
  
  // Route to get occupied seats for a specific screening
  router.get('/seats/occupied/:screeningId', (req, res) => {
    const screeningId = req.params.screeningId;
    const query = 'SELECT seat_num FROM Seats WHERE screening_id = ?';
    
    con.query(query, [screeningId], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error fetching occupied seat data for the specified screening' });
      } else {
        const occupiedSeats = results.map(row => row.seat_num);
        res.json(occupiedSeats);
      }
    });
  });


router.post('/seats/add', (req, res) => {
  const { screeningId, seatNumbers } = req.body;

  // Prepare the values as an array of arrays
  const values = seatNumbers.map(seatNum => [screeningId, seatNum]);

  const query = 'INSERT INTO Seats (screening_id, seat_num) VALUES ?';
  
  con.query(query, [values], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error adding selected seats to the database' });
    } else {
      res.json({ message: 'Selected seats added to the database successfully' });
    }
  });
});

// route to delete a seat
router.delete('/seats/:screeningId/:seatNum', (req, res) => {
  const screeningId = req.params.screeningId;
  const seatNum = req.params.seatNum;
  const query = 'DELETE FROM Seats WHERE screening_id = ? AND seat_num = ?';

  con.query(query, [screeningId, seatNum], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error deleting seat' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Seat not found' });
      } else {
        res.json({ message: 'Seat deleted successfully' });
      }
    }
  });
});


  return router;
};
