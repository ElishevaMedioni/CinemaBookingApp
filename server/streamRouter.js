// StreamRouter.js
const express = require('express');
const router = express.Router();

// The 'con' variable will be received as a parameter
module.exports = (con) => {
  // Sample route to get all streams from the 'Stream' table
  router.get('/Stream', (req, res) => {
    // Your database query to retrieve streams data
    // For example:
    con.query('SELECT * FROM Stream', (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error fetching Stream data' });
        return;
      }
      res.json(results);
    });
  });

  // Sample route to get a specific stream by ID from the 'Stream' table
  router.get('/Stream/:id', (req, res) => {
    // Your database query to retrieve a specific stream data
    // For example:
    const StreamId = req.params.id;
    con.query('SELECT * FROM Stream WHERE id = ?', [StreamId], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error fetching Stream data' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Stream not found' });
        return;
      }
      res.json(results[0]);
    });
  });

  // Update the route to add a projection (stream)
router.post('/streams/create', (req, res) => {
  const { movieId, hallId, time } = req.body;
   // Verify the received values in the console
   console.log('Received:', movieId, hallId, time);

  const query = 'INSERT INTO Stream (movie_id, hall_id, time) VALUES (?, ?, ?)';

  con.query(query, [movieId, hallId, time], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error adding projection' });
    } else {
      res.json({ message: 'Projection added successfully' });
    }
  });
});


  return router;
};
