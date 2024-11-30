# Devops_Frontend
The frontend handles the user interface and interacts with the backend to fetch flight data and perform bookings.

## To Run The project
1. Clone the repository
2. run `cd flight-booking-frontend` to enter React project folder.
3. Run `npm install` to install all dependencies
4. Use available scripts.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npx cypress run`

Runs the tests through the cypress framework.\

## Frontend structure

### FlightList Component
- **Description:** Displays a list of flights fetched from the backend.
- **Features:**
  - Fetches flights from the backend on component mount.
  - Displays flight details, including flight number, departure, destination, times, cost, and available seats.
  - Allows users to initiate a booking by selecting a flight.

### BookFlight Component
- **Description:** Handles the flight booking process.
- **Features:**
  - Accepts user input for booking details (e.g., passenger name, seat selection).
  - Sends a booking request to the backend.
  - Displays confirmation or error messages based on the backend response.

### Alerts Component
- **Description:** Provides feedback to the user on the success or failure of actions.
- **Features:**
  - Displays success or error messages for flight fetching and booking.
  - Automatically hides alerts after a few seconds or on user dismissal.


