// usersRouter.js
const express = require('express');
const router = express.Router();

// The 'con' variable will be received as a parameter
module.exports = (con) => {
  // Sample route to get all users from the 'Users' table
  router.get('/users', (req, res) => {
    // Your database query to retrieve users data
    // For example:
    con.query('SELECT * FROM Users', (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error fetching users data' });
        return;
      }
      res.json(results);
    });
  });
  
  // Sample route to get a specific user by ID from the 'Users' table
  router.get('/users/:id', (req, res) => {
    // Your database query to retrieve a specific user data
    // For example:
    const userId = req.params.id;
    con.query('SELECT * FROM Users WHERE id = ?', [userId], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error fetching user data' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(results[0]);
    });
  });

  return router;
};
