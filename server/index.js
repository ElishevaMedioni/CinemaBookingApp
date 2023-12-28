const express = require('express');
const app = express();
const port = 3001; // You can change this to any desired port number

// Add middleware to parse incoming JSON data
app.use(express.json());

// Import the 'cors' module
const cors = require('cors');

// Database configuration
const mysql = require('mysql2');

// The rest of your code...

// Add middleware to parse incoming JSON data
app.use(express.json());


const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Elishev@mar", // Change this to your actual MySQL password
  port: 3306,
  database: 'CinemaSimulation' // Change this to your desired database name
});


// Enable CORS
const allowedOrigins = ['http://localhost:3000']; // Adjust this based on your front-end's origin
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);



// Connect to the database
con.connect(function (err) {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log("Connected to the database!");
});

// Mount the router for the Users table
const usersRouter = require('./usersRouter')(con); // Adjust the path here, no need for './server/'
app.use('/api', usersRouter);
// Use '/api/users' for users routes

const hallRouter = require('./hallRouter')(con); // Adjust the path here, no need for './server/'
app.use('/api', hallRouter);

const moviesRouter = require('./moviesRouter')(con); // Adjust the path here, no need for './server/'
app.use('/api', moviesRouter);

const ticketsRouter = require('./ticketsRouter')(con); // Adjust the path here, no need for './server/'
app.use('/api', ticketsRouter);

const streamRouter = require('./streamRouter')(con); // Adjust the path here, no need for './server/''
app.use('/api', streamRouter);

const seatsRouter = require('./seatsRouter')(con); // Adjust the path here, no need for './server/''
app.use('/api', seatsRouter);



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

