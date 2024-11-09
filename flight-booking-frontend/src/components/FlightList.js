import React, { useState } from "react";
import axios from "axios";

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [searchParams, setSearchParams] = useState({
    departureLocation: "",
    destinationLocation: "",
  });
  const [error, setError] = useState("");

  const searchFlights = async () => {
    try {
      // Use the environment variable for the backend URL
      const response = await axios.get(
        `$http://localhost:3001/api/flights/search`,
        { params: searchParams }
      );
      setFlights(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching flights:", error);
      setFlights([]);
      setError("No flights found or server error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-lg w-[90%] max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6">Flight Booking</h1>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Departure"
            onChange={(e) =>
              setSearchParams({
                ...searchParams,
                departureLocation: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Destination"
            onChange={(e) =>
              setSearchParams({
                ...searchParams,
                destinationLocation: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
          />
          <button
            onClick={searchFlights}
            className="w-full py-2 bg-blue-500 text-white rounded"
          >
            Search Flights
          </button>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <ul className="mt-6 space-y-4">
          {flights.length === 0 ? (
            <p>No flights found</p>
          ) : (
            flights.map((flight) => (
              <li key={flight.id} className="p-4 border rounded shadow-sm">
                <div className="font-semibold">{flight.flightNumber}</div>
                <div className="text-sm text-gray-600">
                  {flight.departureLocation} to {flight.destinationLocation}
                </div>
                <div className="text-sm text-gray-500">
                  Departure: {flight.departureTime} - Arrival:{" "}
                  {flight.arrivalTime}
                </div>
                <div className="text-lg font-bold text-blue-600">
                  ${flight.cost}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default FlightList;
