import React from "react";
import { flights } from "../DummyData";
import BookFlight from "./BookFlight";

const FlightList = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Available Flights</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {flights.map((flight) => (
          <div key={flight.id} className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">
              Flight {flight.flightNumber}
            </h2>
            <p>
              {flight.departureLocation} ➔ {flight.destinationLocation}
            </p>
            <p>Departure: {new Date(flight.departureTime).toLocaleString()}</p>
            <p>Arrival: {new Date(flight.arrivalTime).toLocaleString()}</p>
            <p>Cost: ${flight.cost}</p>
            <BookFlight flight={flight} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightList;
