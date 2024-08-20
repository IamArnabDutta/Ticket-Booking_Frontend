import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Train from '../assets/train4.avif';
import { TrainDataContext } from '../components/TrainDataProvider';

function Form() {
    const cities = ["Kolkata", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Pune", "Lucknow","Ahmedabad","Chennai","Jaipur"];
    const [fromCity, setFromCity] = useState('');
    const [toCity, setToCity] = useState('');
    const [error, setError] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const navigate = useNavigate();
    const trainsData = useContext(TrainDataContext);

    const validateCities = (from, to) => {
        if (from === to) {
            setError('The "From" and "To" cities cannot be the same');
        } else {
            setError('');
        }
    };

    const handleFromChange = (e) => {
        const selectedFrom = e.target.value;
        setFromCity(selectedFrom);
        validateCities(selectedFrom, toCity);
    };

    const handleToChange = (e) => {
        const selectedTo = e.target.value;
        setToCity(selectedTo);
        validateCities(fromCity, selectedTo);
    };
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!error) {
            const filteredTrains = trainsData.filter(
                train =>
                    train.startingPlace === fromCity && train.destinationPlace === toCity
            );

            navigate('/results', {
                state: { fromCity, toCity, filteredTrains, selectedDate },
            });
        }
    };

    return (
        <div className="relative h-screen">
            <img
                src={Train}
                alt="Background"
                className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <div className="relative flex items-center justify-start h-full px-8 py-4">
                <form className="bg-white w-full max-w-md p-6 rounded-lg  shadow-lg text-indigo-900" onSubmit={handleSubmit}>
                    <div className="text-center mb-2 text-indigo-900">
                        <h2 className="text-3xl font-bold uppercase">Book Ticket</h2>
                    </div>
                    <div className="mb-6">
                        <label className="block uppercase tracking-wide text-x font-bold mb-1" htmlFor="grid-from">
                            From
                        </label>
                        <select
                            className={`appearance-none block w-full border-2 bg-gray-200 border ${error ? 'border-red-500' : 'border-indigo-900'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                            id="grid-from"
                            value={fromCity}
                            onChange={handleFromChange}
                        >
                            <option value="" disabled>Select City</option>
                            {cities.map((city, index) => (
                                <option key={index} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block uppercase tracking-wide text-x font-bold mb-1" htmlFor="grid-to">
                            To
                        </label>
                        <select
                            className={`appearance-none block w-full border-2 bg-gray-200 border ${error ? 'border-red-500' : 'border-indigo-900'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                            id="grid-to"
                            value={toCity}
                            onChange={handleToChange}
                        >
                            <option value="" disabled>Select City</option>
                            {cities.map((city, index) => (
                                <option key={index} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>
                    {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                    <div className="mb-6">
                        <label className="block uppercase tracking-wide text-x font-bold mb-1" htmlFor="grid-from-date">
                            Date
                        </label>
                        <input
                            className="appearance-none block w-full border-2 bg-gray-200 border border-indigo-900 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-900"
                            id="grid-from-date"
                            type="date"
                            value={selectedDate} // Bind the value to state
                            onChange={handleDateChange}
                        />
                    </div>

                    <div className="flex justify-start">
                        <button className="bg-orange-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;
