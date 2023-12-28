
---

# Cinema Booking App Server 🎬🎟️

Welcome to the server-side of the Cinema Booking App! This repository contains the backend components responsible for managing users, movies, screenings, halls, tickets, and seats.

## Project Structure 📁

- **Client:**
  - **ManagerApp.js:** React component for the manager interface.
  - **MovieSelection.js:** Component for choosing a movie on the user side.
  - **ScreeningList.js:** Component displaying the list of screenings for a selected movie.
  - **ScreeningModal.js:** Modal displaying the screening list for a selected movie.
  - **SeatSelection.js:** Component handling seat selection and purchase confirmation.

- **Server:**

- **create_db.js:** Script for initializing and configuring the MySQL database.

- **seatsRouter.js:** Router handling seat-related operations.

- **movieRouter.js:** Router managing movie-related operations.

- **streamRouter.js:** Router for handling screening/stream-related operations.

- **hallRouter.js:** Router dealing with hall-related operations.

- **ticketsRouter.js:** Router managing ticket-related operations.

- **userRouter.js:** Router handling user-related operations.

- **index.js:** Main entry point for the server, connecting to the database, enabling CORS, and mounting routers.

## Database Initialization 🚀

The `create_db.js` script initializes the MySQL database `CinemaSimulation` and creates tables for Users, Movies, Stream, Hall, Tickets, and Seats. It drops existing tables before creating new ones.

## Routers Overview 🛠️

### Users Router

- **GET /api/users:** Retrieve all users from the 'Users' table.
  
- **GET /api/users/:id:** Retrieve a specific user by ID from the 'Users' table.

```javascript
// Example usage in client-side code:
fetch('http://localhost:3001/api/users')
  .then(response => response.json())
  .then(data => console.log(data));
```

### Halls Router

- **GET /api/halls:** Retrieve all halls from the 'Hall' table.

```javascript
// Example usage in client-side code:
fetch('http://localhost:3001/api/halls')
  .then(response => response.json())
  .then(data => console.log(data));
```

### Movies Router

- **GET /api/movies:** Retrieve all movies from the 'Movies' table.
  
- **GET /api/movies/:id:** Retrieve a specific movie by ID from the 'Movies' table.

```javascript
// Example usage in client-side code:
fetch('http://localhost:3001/api/movies')
  .then(response => response.json())
  .then(data => console.log(data));
```

### Stream Router

- **GET /api/streams:** Retrieve all streams/screenings from the 'Stream' table.

```javascript
// Example usage in client-side code:
fetch('http://localhost:3001/api/streams')
  .then(response => response.json())
  .then(data => console.log(data));
```

### Tickets Router

- **GET /api/tickets:** Retrieve all tickets from the 'Tickets' table.

```javascript
// Example usage in client-side code:
fetch('http://localhost:3001/api/tickets')
  .then(response => response.json())
  .then(data => console.log(data));
```

### Seats Router

- **GET /api/seats/occupied/:screeningId:** Retrieve occupied seats for a specific screening.

- **POST /api/seats/add:** Add selected seats to the database.

```javascript
// Example usage in client-side code:
fetch('http://localhost:3001/api/seats/occupied/1')
  .then(response => response.json())
  .then(data => console.log(data));
```

## Getting Started 🚀

1. Clone the repository:

   ```bash
   git clone https://github.com/ElishevaMedioni/full_stack_project7.git
   ```

2. Install dependencies:

   ```bash
   cd full_stack_project7
   npm install
   ```

3. Configure the MySQL database:

   ```bash
   npm run create-db
   ```

4. Run the server:

   ```bash
   npm start
   ```

   The server will be accessible at [http://localhost:3001](http://localhost:3001).



---

