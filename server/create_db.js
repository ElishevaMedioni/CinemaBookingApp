const mysql = require('mysql2');
const http = require('http');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Elishev@mar", // Change this to your actual MySQL password
  port: 3306,
  //database: 'CinemaSimulation' // Change this to your desired database name
});

const initializeDatabase = async () => {
  try {
    await new Promise((resolve, reject) => {
      con.connect((err) => {
        if (err) reject(err);
        console.log("Connected!");
        resolve();
      });
    });

    // Create the database
    await new Promise((resolve, reject) => {
      con.query("CREATE DATABASE IF NOT EXISTS CinemaSimulation", (err, result) => {
        if (err) reject(err);
        console.log("Database Created");
        resolve();
      });
    });

    // Use the database
    await new Promise((resolve, reject) => {
      con.query("USE CinemaSimulation", (err, result) => {
        if (err) reject(err);
        console.log("Database Selected");
        resolve();
      });
    });
    await new Promise((resolve, reject) => {
      con.query("DROP TABLE IF EXISTS Users", (err, result) => {
        if (err) reject(err);
        console.log("Dropped 'Users' table if it existed");
        resolve();
      });
    });
    await new Promise((resolve, reject) => {
      con.query("DROP TABLE IF EXISTS Movies", (err, result) => {
        if (err) reject(err);
        console.log("Dropped 'Movies' table if it existed");
        resolve();
      });
    });
    await new Promise((resolve, reject) => {
      con.query("DROP TABLE IF EXISTS Stream", (err, result) => {
        if (err) reject(err);
        console.log("Dropped 'Stream' table if it existed");
        resolve();
      });
    });
    await new Promise((resolve, reject) => {
      con.query("DROP TABLE IF EXISTS Hall", (err, result) => {
        if (err) reject(err);
        console.log("Dropped 'Hall' table if it existed");
        resolve();
      });
    });

    await new Promise((resolve, reject) => {
      con.query("DROP TABLE IF EXISTS Tickets", (err, result) => {
        if (err) reject(err);
        console.log("Dropped 'Tickets' table if it existed");
        resolve();
      });
    });

    await new Promise((resolve, reject) => {
      con.query("DROP TABLE IF EXISTS Seats", (err, result) => {
        if (err) reject(err);
        console.log("Dropped 'Tickets' table if it existed");
        resolve();
      });
    });

    
    
    // Function to create a table with given columns
const createTable = async (tableName, columns) => {
  let sql = `CREATE TABLE IF NOT EXISTS ${tableName} (`;
  columns.forEach(column => {
    sql += `${column.name} ${column.datatype},`;
  });
  sql = sql.slice(0, -1) + ')';

  return new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) return reject(err);
      console.log(`Table '${tableName}' created successfully`);
      resolve(result);
    });
  });
};
// Function to insert data into a table
const insertData = async (tableName, data) => {
  if (data.length === 0) return; // Skip if there's no data

  const columns = Object.keys(data[0]);
  const values = data.map(instance => Object.values(instance));

  let sql = `INSERT INTO ${tableName} (${columns.join(',')}) VALUES ?`;

  return new Promise((resolve, reject) => {
    con.query(sql, [values], function (err, result) {
      if (err) return reject(err);
      console.log(`Number of records inserted into '${tableName}': ${result.affectedRows}`);
      resolve(result);
    });
  });
};

// Create the tables
await createTable('Users', [
{ name: 'id', datatype: 'INT AUTO_INCREMENT PRIMARY KEY' },
{ name: 'name', datatype: 'VARCHAR(255)' },
{ name: 'password', datatype: 'VARCHAR(255)' },
{ name: 'isManager', datatype: 'BOOLEAN' },
{name: 'email', datatype: 'VARCHAR(255)' },
{name: 'phone', datatype: 'VARCHAR(255)' }
]);

await createTable('Movies', [
  { name: 'id', datatype: 'INT AUTO_INCREMENT PRIMARY KEY' },
  { name: 'name', datatype: 'VARCHAR(255)' },
  {name: 'trailer_url', datatype: 'VARCHAR(255)' },
  { name: 'posterUrl', datatype: 'VARCHAR(255)' },
  { name: 'price', datatype: 'INT'}

]);

await createTable('Tickets', [
  { name: 'id', datatype: 'INT AUTO_INCREMENT PRIMARY KEY' },
  { name: 'user_id', datatype: 'INT' },
  { name: 'stream_id', datatype: 'INT' },
  { name: 'seat_num', datatype: 'INT' }, 

]);


await createTable('Hall', [
  { name: 'id', datatype: 'INT AUTO_INCREMENT PRIMARY KEY' },
  { name: 'name', datatype: 'VARCHAR(255)' },
  { name: 'num_rows', datatype: 'INT' }, 
  { name: 'num_columns', datatype: 'INT' },
]);


await createTable('Stream', [
  { name: 'id', datatype: 'INT AUTO_INCREMENT PRIMARY KEY' },
  { name: 'movie_id', datatype: 'INT' },
  { name: 'hall_id', datatype: 'INT' },
  { name: 'time', datatype: 'VARCHAR(255)' }
]);

await createTable('Seats', [
  { name: 'id', datatype: 'INT AUTO_INCREMENT PRIMARY KEY' },
  { name: 'screening_id', datatype: 'INT' }, // Reference to the screening
  { name: 'seat_num', datatype: 'INT' }
]);

console.log('Tables created successfully');

const usersData = [
  { name: 'User1', password: 'password1', isManager: false , email: 'abd@gmail.com ', phone: '054-1234567'},
  { name: 'User2', password: 'password2', isManager: true , email: 'abc@gmail.com" ', phone: '054-1234568'},
  { name: 'User3', password: 'password3', isManager: false , email: 'abcd@gmail.com ', phone: '054-1234569' },
  { name: 'User4', password: 'password4', isManager: true, email: 'abcde@gmail.com" ', phone: '054-1234588' },
  { name: 'User5', password: 'password5', isManager: false, email: 'abcdef@gmail.com ', phone: '054-1234589' },
  { name: 'User6', password: 'password6', isManager: true, email: 'abcdefg@gmail.com ', phone: '054-1234569' },
  { name: 'User7', password: 'password7', isManager: false, email: 'abcd@gmail.com ', phone: '054-1234569' },
  { name: 'User8', password: 'password8', isManager: true, email: 'abcd@gmail.com ', phone: '054-1234569' },
  // Add more user data as needed
];

await insertData('Users', usersData);

// Function to insert movies into the 'Movies' table
// Function to insert movies into the 'Movies' table
const insertMovies = () => {
  const moviesData = [
    { name: 'Toy Story', trailer_url: 'v-PjgYDrg70', posterUrl: 'https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_.jpg', price: 10 },
    { name: 'Cinderella', trailer_url: 'UcjYD91YW_M', posterUrl: 'https://m.media-amazon.com/images/I/51XK-yYR44L._AC_UF894,1000_QL80_.jpg', price: 10 },
    { name: 'Ratatouille', trailer_url: 'NgsQ8mVkN8w', posterUrl: 'https://m.media-amazon.com/images/I/714TagaORGL.jpg' , price: 10},
    { name: 'The Emperors New Groove', trailer_url: 'JX6btxoFhI8', posterUrl: 'https://m.media-amazon.com/images/I/51E8oSxhMuL._AC_UF894,1000_QL80_.jpg', price: 12 },
    { name: 'Inside out', trailer_url: 'yRUAzGQ3nSY', posterUrl: 'https://m.media-amazon.com/images/M/MV5BOTgxMDQwMDk0OF5BMl5BanBnXkFtZTgwNjU5OTg2NDE@._V1_.jpg', price: 10 },
    { name: 'The beauty and the beast', trailer_url: 'iurbZwxKFUE', posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTUwNjUxMTM4NV5BMl5BanBnXkFtZTgwODExMDQzMTI@._V1_.jpg', price: 10 },
    { name: 'Aladdin', trailer_url: 'eTjHiQKJUDY', posterUrl: 'https://m.media-amazon.com/images/I/716e9qhR19L.jpg', price: 9 },
    { name: 'Tangled', trailer_url: '2f516ZLyC6U', posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTAxNDYxMjg0MjNeQTJeQWpwZ15BbWU3MDcyNTk2OTM@._V1_FMjpg_UX1000_.jpg', price: 13},
    { name: 'Moana', trailer_url: 'LKFuXETZUsI', posterUrl: 'https://m.media-amazon.com/images/I/A1JOaV3B6fL._AC_UF894,1000_QL80_.jpg', price: 9 }
  ];

  const insertQuery = 'INSERT INTO Movies (name, trailer_url,posterUrl,price) VALUES ?';

  con.query(insertQuery, [moviesData.map(movie => [movie.name, movie.trailer_url, movie.posterUrl, movie.price])], (err, result) => {
    if (err) {
      console.error('Error inserting movies:', err);
    } else {
      console.log(`${result.affectedRows} movies inserted successfully`);
    }
  });
};

  
  // Function to insert halls into the 'Hall' table
  const insertHalls = () => {
    const hallsData = [
      { name: 'Hall A', num_rows: 8, num_columns: 8 },
      { name: 'Hall B', num_rows: 8 ,num_columns: 8},
      { name: 'Hall C', num_rows: 8 ,num_columns: 8 }
    ];
  
    const insertQuery = 'INSERT INTO Hall (name, num_rows,num_columns) VALUES ?';
  
    con.query(insertQuery, [hallsData.map(hall => [hall.name, hall.num_rows, hall.num_columns])], (err, result) => {
      if (err) {
        console.error('Error inserting halls:', err);
      } else {
        console.log(`${result.affectedRows} halls inserted successfully`);
      }
    });
  };

  
  
  // Function to insert streams into the 'Stream' table
  const insertStreams = () => {
    const streamsData = [
      { movie_id: 1, hall_id: 1, time: '2023-07-30 18:00:00' },
      { movie_id: 2, hall_id: 2, time: '2023-07-30 18:00:00' },
      { movie_id: 3, hall_id: 3, time: '2023-07-30 18:00:00' },

      { movie_id: 4, hall_id: 1, time: '2023-07-30 20:00:00' },
      { movie_id: 5, hall_id: 2, time: '2023-07-30 20:00:00' },
      { movie_id: 6, hall_id: 3, time: '2023-07-30 20:00:00' },

      { movie_id: 1, hall_id: 1, time: '2023-07-30 22:00:00' },
      { movie_id: 2, hall_id: 2, time: '2023-07-30 22:00:00' },
      { movie_id: 3, hall_id: 3, time: '2023-07-30 22:00:00' },

      { movie_id: 7, hall_id: 1, time: '2023-08-30 18:00:00' },
      { movie_id: 8, hall_id: 2, time: '2023-08-30 18:00:00' },
      { movie_id: 9, hall_id: 3, time: '2023-08-30 18:00:00' },

      { movie_id: 4, hall_id: 1, time: '2023-08-30 20:00:00' },
      { movie_id: 5, hall_id: 2, time: '2023-08-30 20:00:00' },
      { movie_id: 6, hall_id: 3, time: '2023-08-30 20:00:00' },

      { movie_id: 7, hall_id: 1, time: '2023-08-30 22:00:00' },
      { movie_id: 8, hall_id: 2, time: '2023-08-30 22:00:00' },
      { movie_id: 9, hall_id: 3, time: '2023-08-30 22:00:00' },
      
      { movie_id: 7, hall_id: 1, time: '2023-09-30 18:00:00' },
      { movie_id: 8, hall_id: 2, time: '2023-09-30 18:00:00' },
      { movie_id: 9, hall_id: 3, time: '2023-09-30 18:00:00' },

      { movie_id: 4, hall_id: 1, time: '2023-09-30 20:00:00' },
      { movie_id: 5, hall_id: 2, time: '2023-09-30 20:00:00' },
      { movie_id: 6, hall_id: 3, time: '2023-09-30 20:00:00' },

      { movie_id: 7, hall_id: 1, time: '2023-09-30 22:00:00' },
      { movie_id: 8, hall_id: 2, time: '2023-09-30 22:00:00' },
      { movie_id: 9, hall_id: 3, time: '2023-09-30 22:00:00' }

      // Add more stream data as needed
    ];
  
    const insertQuery = 'INSERT INTO Stream (movie_id, hall_id, time) VALUES ?';
  
    con.query(insertQuery, [streamsData.map(stream => [stream.movie_id, stream.hall_id, stream.time])], (err, result) => {
      if (err) {
        console.error('Error inserting streams:', err);
      } else {
        console.log(`${result.affectedRows} streams inserted successfully`);
      }
    });
  };

  // Insert seat data for a specific screening
const insertSeats =  () => {
  const seatsData = [
    { screening_id: 1, seat_num: 1 },
    { screening_id: 1, seat_num: 2},
    { screening_id: 1, seat_num: 3},
    { screening_id: 2, seat_num: 4},
    { screening_id: 2, seat_num: 5 },
    { screening_id: 3, seat_num: 3 },
    { screening_id: 4, seat_num: 3 },
    { screening_id: 5, seat_num: 6 }
  ];

  const insertQuery = 'INSERT INTO Seats (screening_id, seat_num) VALUES ?';

  con.query(insertQuery, [seatsData.map(seat => [seat.screening_id, seat.seat_num])], (err, result) => {
    if (err) {
      console.error('Error inserting seats:', err);
    } else {
      console.log(`${result.affectedRows} seats inserted successfully`);
    }
  });
};

  
  
  // Call the functions to insert data into the tables
  insertMovies();
  insertHalls();
  insertStreams();
  insertSeats();

    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the database connection
    con.end();
  }
};

// Call the async function to initialize the database
initializeDatabase();
