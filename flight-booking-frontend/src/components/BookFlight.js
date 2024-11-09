import React, { useState } from "react";

const BookFlight = ({ flight }) => {
  const [seatsToBook, setSeatsToBook] = useState(1); // Initialize seats to book to 1
  const [availableSeats, setAvailableSeats] = useState(flight.availableSeats); // Initialize available seats from flight prop

  const handleBooking = () => {
    // If the number of seats to book is invalid, show an alert
    if (seatsToBook <= 0 || seatsToBook > availableSeats) {
      alert("Please enter a valid number of seats.");
      return;
    }

    // Update available seats after booking
    setAvailableSeats(availableSeats - seatsToBook);

    alert(
      `Successfully booked ${seatsToBook} seat(s) on flight ${flight.flightNumber}!`
    );
  };

  return (
    <div className="p-4 mt-4 border rounded-lg shadow-md bg-white">
      {/* Label for the input */}
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Seats to Book:
      </label>

      {/* Input for selecting the number of seats to book */}
      <input
        type="number"
        min="1"
        max={availableSeats}
        value={seatsToBook}
        onChange={(e) => setSeatsToBook(parseInt(e.target.value))}
        className="border px-4 py-2 rounded w-full text-gray-800 mb-4"
      />

      {/* Booking Button */}
      <button
        onClick={handleBooking}
        className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Book Now
      </button>

      {/* Display available seats */}
      <p className="mt-2 text-sm text-gray-600">
        Available Seats: {availableSeats}
      </p>
    </div>
  );
};

export default BookFlight;
