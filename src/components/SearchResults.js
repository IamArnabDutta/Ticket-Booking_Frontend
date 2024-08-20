import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
// import defaultimg from '../assets/train5.jpg';



function SearchResults() {
    const location = useLocation();
    const { fromCity, toCity, filteredTrains, selectedDate } = location.state || {};

    // State to manage seat availability
    const [trains, setTrains] = useState(filteredTrains || []);

    const handleBookTicket = (index) => {
        // Clone the trains array to avoid direct mutation
        const updatedTrains = [...trains];
        // Check if seats are available
        if (updatedTrains[index].seats > 0) {
            updatedTrains[index].seats -= 1;
            setTrains(updatedTrains);
        } else {
            alert('No seats available for this train.');
        }
    };

    // Calculate the number of results
    const resultCount = trains.length;


    const formattedDate = selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : 'No Date Selected';

  
    const headerMessage = `${resultCount} Results for ${fromCity} to ${toCity} | ${formattedDate}`;
   


    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Sidebar */}
            <aside className="w-full md:w-64 p-4 border-b border-gray-300  md:sticky md:top-0" style={{ boxShadow: '4px 0 10px -2px rgba(0, 0, 0, 0.3)' }}>
                <div className="sticky top-0">
                    <div className="flex mb-4 mt-4">
                        <div className="w-full bg-indigo-900 h-12">
                            {/* Sidebar Header */}
                            <h2 className="text-lg font-bold text-white p-2">Search Details</h2>
                        </div>
                    </div>
                    <div className="font-bold text-white">
                        <p className="bg-gray-500 h-12 mb-2 bg-indigo-900 p-2">
                            <strong>From City :</strong> {fromCity}
                        </p>
                        <p className="bg-gray-500 h-12 mb-2 bg-indigo-900 p-2">
                            <strong>To City :</strong> {toCity}
                        </p>
                        <p className="bg-gray-500 h-12 bg-indigo-900 p-2">
                            <strong>Date :</strong> {selectedDate}
                        </p>
                    </div>
                </div>

            </aside>

            <div className="flex-1 flex flex-col">
                {/* Main Content */}
                <section className="flex-1 p-4 md:p-6 lg:p-8 antialiased">
                    <div className="bg-indigo-900 text-white py-4 px-6 rounded-lg shadow-md mb-6">
                        <h1 className="text-lg md:text-2xl font-bold text-center">{headerMessage}</h1>
                    </div>
                    {fromCity && toCity ? (
                        <div className="flex flex-col space-y-4">
                            {trains && trains.length > 0 ? (
                                trains.map((train, index) => (
                                    <article
                                        key={index}
                                        className="flex flex-col md:flex-row shadow-md max-w-full lg:max-w-5xl mx-auto mb-4 group cursor-pointer transform duration-500 hover:-translate-y-1"
                                    >
                                        <img
                                            className="w-full md:w-1/3 h-auto object-cover"
                                            src={train.imageUrl}
                                            alt={train.trainName}
                                        />
                                        <div className="p-4 flex flex-col justify-between w-full md:w-2/3">
                                            <div>
                                                <h2 className="text-lg md:text-xl font-semibold text-gray-800">{train.trainName}</h2>
                                                <p className="text-sm md:text-base text-gray-400 mt-1 leading-relaxed">
                                                    Departure : {train.startingPlace} | Arrival : {train.destinationPlace}
                                                </p>
                                                <p className="text-sm md:text-base text-gray-600 mt-1">
                                                    Train No : <span className="font-bold">{train.trainNumber}</span>
                                                </p>
                                                <p className="text-sm md:text-base text-gray-600 mt-1">
                                                    Arrival Time : <span className="font-bold">{new Date(train.times.arrival).toLocaleTimeString()}</span>
                                                </p>
                                                <p className="text-sm md:text-base text-gray-600 mt-1">
                                                    Departure Time : <span className="font-bold">{new Date(train.times.departure).toLocaleTimeString()}</span>
                                                </p>
                                            </div>
                                            <div className="bg-blue-50 p-4 mt-4">
                                                <div className="flex flex-col md:flex-row md:justify-between">
                                                    <div className="mb-2 md:mb-0">
                                                        <div className="text-sm md:text-base text-gray-700">
                                                            <span className="text-gray-900 font-bold">{train.fare}</span> Fare
                                                        </div>
                                                        <div className="text-sm md:text-base text-gray-700 mt-1">
                                                            <span className="text-gray-900 font-bold">{train.seats}</span> Seats Available
                                                        </div>
                                                    </div>
                                                    <button
                                                        className="py-2 px-4 bg-[#e65100] hover:bg-[#26a69a] font-bold text-white text-sm rounded-md shadow-md"
                                                        onClick={() => handleBookTicket(index)}
                                                    >
                                                        Book Ticket
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))
                            ) : (
                                <div className="text-center text-gray-600">
                                    No trains found matching your criteria.
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600">No search criteria provided.</p>
                    )}
                </section>

                {/* Banner Component */}

            </div>
        </div>
    );
}

export default SearchResults;
