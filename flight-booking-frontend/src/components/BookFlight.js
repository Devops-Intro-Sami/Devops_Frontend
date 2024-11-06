import React, { useState } from "react";

const BookFlight = ({ flight }) => {
  const [seatsToBook, setSeatsToBook] = useState(1);
  const [availableSeats, setAvailableSeats] = useState(flight.availableSeats);

  const handleBooking = () => {
    if (seatsToBook <= 0 || seatsToBook > availableSeats) {
      alert("Please enter a valid number of seats.");
      return;
    }

    // Update the available seats state
    setAvailableSeats(availableSeats - seatsToBook);

    alert(
      `Successfully booked ${seatsToBook} seat(s) on flight ${flight.flightNumber}!`
    );
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">
        Seats to Book:
      </label>
      <input
        type="number"
        min="1"
        max={availableSeats}
        value={seatsToBook}
        onChange={(e) => setSeatsToBook(parseInt(e.target.value))}
        className="border rounded px-2 py-1 w-full"
      />
      <button
        onClick={handleBooking}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Book Now
      </button>
      <p className="mt-2 text-sm text-gray-600">
        Available Seats: {availableSeats}
      </p>
    </div>
  );
};

export default BookFlight;
