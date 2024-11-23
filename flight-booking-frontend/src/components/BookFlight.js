import React, { useState } from "react";
import axios from "axios";
import AlertDialog from "./Alerts";
import "react-toastify/dist/ReactToastify.css";

const BookFlight = ({ flight }) => {
  const [seatsToBook, setSeatsToBook] = useState(1);
  const [availableSeats, setAvailableSeats] = useState(flight.availableSeats);
  const [error, setError] = useState("");

  const handleBooking = async () => {
    console.log(":::::", seatsToBook);
    if (
      seatsToBook <= 0 ||
      seatsToBook > availableSeats ||
      isNaN(seatsToBook)
    ) {
      setError("Please enter a valid number of seats.");
      return;
    }

    try {
      // Send booking request to the backend
      const response = await axios.post(
        "http://localhost:3001/api/flights/book",
        {
          flightId: flight.id, // Pass the flight id
          seatsToBook: seatsToBook, // Number of seats to book
        }
      );

      // Update available seats based on the response
      setAvailableSeats(response.data.availableSeats);
      console.log("::::::::", response.data.message);
      document.getElementById(`alert-success-${flight.id}`).showModal();
      setError(""); // Clear error message
    } catch (error) {
      console.error("Error booking flight:", error);
      setError(
        error.response ? error.response.data.message : "Booking failed."
      );
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">
        Seats to Book:
      </label>
      <input
        data-cy={`seats_number_textfield_flight_${flight.id}`}
        type="number"
        min="1"
        max={availableSeats}
        value={seatsToBook}
        onChange={(e) => setSeatsToBook(parseInt(e.target.value))}
        className="border rounded px-2 py-1 w-full"
      />
      <button
        data-cy={`book_now_button_flight_${flight.id}`}
        onClick={handleBooking}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Book Now
      </button>

      {error && (
        <p data-cy="error_message" className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}

      <p
        seats={availableSeats}
        data-cy={`available_seats_number_flight_${flight.id}`}
        className="mt-2 text-sm text-gray-600"
      >
        Available Seats: {availableSeats}
      </p>

      <AlertDialog
        text={"Success booking flights"}
        type={"success"}
        flightId={flight.id}
      />
    </div>
  );
};

export default BookFlight;
