// hallRouter.js
const express = require('express');
const router = express.Router();

// The 'con' variable will be received as a parameter
module.exports = (con) => {
  // Sample route to get all halls from the 'Halls' table
  router.get('/Hall', (req, res) => {
    // Your database query to retrieve users data
    // For example:
    con.query('SELECT * FROM Hall', (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error fetching Hall data' });
        return;
      }
      res.json(results);
    });
  });

  // Sample route to get a specific hall by ID from the 'Halls' table
  router.get('/Hall/:id', (req, res) => {
    // Your database query to retrieve a specific hall data
    // For example:
    const HallId = req.params.id;
    con.query('SELECT * FROM Hall WHERE id = ?', [HallId], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error fetching Hall data' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Hall not found' });
        return;
      }
      res.json(results[0]);
    });
  });

  return router;
};
