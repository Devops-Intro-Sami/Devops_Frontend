import React, { useState, useEffect } from "react";
import axios from "axios";

import { format } from "date-fns"; // Import the format function from date-fns
import BookFlight from "./BookFlight"; // Import the BookFlight component

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [searchParams, setSearchParams] = useState({
    departureLocation: "",
    destinationLocation: "",
  });
  const [error, setError] = useState("");

  // Fetch all flights when the component mounts
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/flights/search"
        );
        setFlights(response.data); // Set all flights on initial render
        setError("");
      } catch (error) {
        console.error("Error fetching flights:", error);
        setError("Failed to fetch flights.");
        setFlights([]);
      }
    };
    fetchFlights();
  }, []); // Empty array ensures this runs only once after the initial render

  const searchFlights = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/flights/search",
        {
          params: searchParams,
        }
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
        <h1
          data-cy="flight_site_header"
          className="text-3xl font-bold text-center mb-6"
        >
          Flight Booking
        </h1>

        {/* Search Form */}
        <div className="space-y-4">
          <input
            data-cy={`departure_search_textfield`}
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
            data-cy={`destination_search_textfield`}
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
            data-cy={`search_flights_button`}
            onClick={searchFlights}
            className="w-full py-2 bg-blue-500 text-white rounded"
          >
            Search Flights
          </button>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Flight List */}
        <ul className="mt-6 space-y-4">
          {flights.length === 0 ? (
            <p>No flights found</p>
          ) : (
            flights.map((flight) => (
              <li
                data-cy="flight_component"
                key={flight.id}
                className="p-4 border rounded shadow-sm bg-white"
              >
                <div className="font-semibold">{flight.flightNumber}</div>
                <div
                  data-cy={`depart_dest_text_flight_${flight.id}`}
                  className="text-sm text-gray-600"
                >
                  {flight.departureLocation} ➡️ {flight.destinationLocation}
                </div>

                {/* Format the departure and arrival times using date-fns */}
                <div className="text-sm text-gray-500">
                  Departure:{" "}
                  {format(
                    new Date(flight.departureTime),
                    "MMM dd, yyyy hh:mm a"
                  )}
                  <br /> Arrival:{" "}
                  {format(new Date(flight.arrivalTime), "MMM dd, yyyy hh:mm a")}
                </div>

                <div
                  cost={flight.cost}
                  className="text-lg font-bold text-blue-600"
                >
                  ${flight.cost}
                </div>

                {/* Include BookFlight component here */}
                <BookFlight flight={flight} />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default FlightList;
