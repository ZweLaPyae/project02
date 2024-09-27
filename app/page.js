"use client";

import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from "../components/navbar";
import TripDetails from './trips/tripDetails/page'; // Adjust the import path

export default function Home() {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    // Fetch trips from the server
    fetch('/api/trip')
      .then(response => response.json())
      .then(data => {
        setTrips(data);
      })
      .catch(error => {
        console.error('Error fetching trips:', error);
      });
  }, []);

  const handleTripClick = (tripId) => {
    const selectedTrip = trips.find(trip => trip._id === tripId);
    setSelectedTrip(selectedTrip);
  };

  return (
    <div>
      <ResponsiveAppBar />
      <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-5 row-start-2 items-center sm:items-start">
          <h1 className="text-3xl font-bold">Recommended Trips</h1>
          
          {selectedTrip ? (
            <TripDetails tripDetails={selectedTrip} onBack={() => setSelectedTrip(null)} fromHomePage={true} />
          ) : (
            <section className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {trips.slice(0, 5).map((trip) => (
                  <div 
                    key={trip._id} 
                    className="text-center p-2 cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg" 
                    onClick={() => handleTripClick(trip._id)}
                  >
                    <img
                      src={trip.imageUrl}
                      alt={trip.name}
                      className="w-80 h-48 object-cover rounded-lg mx-auto"
                    />
                    <h6 className="mt-2">{trip.name}</h6>
                    <p className="text-sm text-gray-500">{trip.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          
        </footer>
      </div>
    </div>
  );
}