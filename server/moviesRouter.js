// moviesRouter.js
const express = require('express');
const router = express.Router();

// The 'con' variable will be received as a parameter
module.exports = (con) => {


  // Sample route to get all movies from the 'Movies' table
  router.get('/Movies', (req, res) => {
    // Your database query to retrieve movies data
    // For example:
    con.query('SELECT * FROM Movies', (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error fetching Movies data' });
        return;
      }
      res.json(results);
    });
  });

  // Sample route to get a specific user by ID from the 'Movies' table
  router.get('/Movies/:id', (req, res) => {
    // Your database query to retrieve a specific movie data
    // For example:
    const MoviesId = req.params.id;
    con.query('SELECT * FROM Movies WHERE id = ?', [MoviesId], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error fetching Movies data' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Movies not found' });
        return;
      }
      res.json(results[0]);
    });
  });


  // Route to add a movie to the 'Movies' table
  router.post('/Movies', (req, res) => {
    const { name, trailer_url, posterUrl } = req.body; // Assuming you're sending these fields in the request body

    // Your database query to insert a new movie into the 'Movies' table
    // For example:
    const insertQuery = 'INSERT INTO Movies (name, trailer_url, posterUrl) VALUES (?, ?, ?)';
    con.query(insertQuery, [name, trailer_url, posterUrl], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error adding movie' });
        return;
      }
      res.json({ message: 'Movie added successfully', insertedId: result.insertId });
    });
  });

  return router;
};
