// TicketsRouter.js
const express = require('express');
const router = express.Router();

// The 'con' variable will be received as a parameter
module.exports = (con) => {
  // Sample route to get all tickets from the 'Tickets' table
  router.get('/Tickets', (req, res) => {
    // Your database query to retrieve tickets data
    // For example:
    con.query('SELECT * FROM Tickets', (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error fetching Stream data' });
        return;
      }
      res.json(results);
    });
  });

  // Sample route to get a specific ticket by ID from the 'Tickets' table
  router.get('/Tickets/:id', (req, res) => {
    // Your database query to retrieve a specific ticket data
    // For example:
    const TicketsId = req.params.id;
    con.query('SELECT * FROM Tickets WHERE id = ?', [TicketsId], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error fetching Tickets data' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Tickets not found' });
        return;
      }
      res.json(results[0]);
    });
  });

  // Add this route to handle creating tickets
router.post('/tickets/create', (req, res) => {
  const { userId, screeningId, seatNumbers } = req.body;

  // Insert a ticket for each selected seat
  const ticketValues = seatNumbers.map(seatNum => [userId, screeningId, seatNum]);
  const ticketQuery = 'INSERT INTO Tickets (user_id, stream_id, seat_num) VALUES ?';

  con.query(ticketQuery, [ticketValues], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error creating tickets' });
    } else {
      res.json({ message: 'Tickets created successfully' });
    }
  });
});


// Update the route to get tickets for a specific user
router.get('/tickets/user/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = 'SELECT * FROM Tickets WHERE user_id = ?';

  con.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error fetching user tickets' });
    } else {
      res.json(results);
    }
  });
});

// route to delete tickets
router.delete('/tickets/:id', (req, res) => {
  const ticketId = req.params.id;
  const query = 'DELETE FROM Tickets WHERE id = ?';

  con.query(query, [ticketId], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error deleting ticket' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Ticket not found' });
      } else {
        res.json({ message: 'Ticket deleted successfully' });
      }
    }
  });
});


  return router;
};
