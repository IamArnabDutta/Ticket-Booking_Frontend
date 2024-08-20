import React, { useEffect, useState, useContext } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { TrainDataContext } from '../components/TrainDataProvider';



const Dashboard = () => {
    const trainsData = useContext(TrainDataContext);
    const [trains, setTrains] = useState([]);
    const [editingTrain, setEditingTrain] = useState(null);
    const [trainData, setTrainData] = useState({
        trainNumber: '',
        trainName: '',
        startingPlace: '',
        destinationPlace: '',
        fare: '',
        seats: '',
        arrival: '',
        departure: '',
    });
    const [showAddForm, setShowAddForm] = useState(false);
    const [newTrainData, setNewTrainData] = useState({
        trainNumber: '',
        trainName: '',
        startingPlace: '',
        destinationPlace: '',
        fare: '',
        seats: '',
        arrival: '',
        departure: '',
    });

    useEffect(() => {
        // Initialize trains with data from context
        setTrains(trainsData);
    }, [trainsData]);

    const handleEdit = (train) => {
        setEditingTrain(train);
        setTrainData({
            trainNumber: train.trainNumber,
            trainName: train.trainName,
            startingPlace: train.startingPlace,
            destinationPlace: train.destinationPlace,
            fare: train.fare,
            seats: train.seats,
            arrival: new Date(train.times.arrival).toISOString().substring(0, 16),
            departure: new Date(train.times.departure).toISOString().substring(0, 16),
        });
    };

    const handleDelete = (train) => {
        // Filter out the train to be deleted from the state
        const updatedTrains = trains.filter(t => t.trainNumber !== train.trainNumber);
        setTrains(updatedTrains);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrainData({
            ...trainData,
            [name]: value,
        });
    };

    const handleSave = () => {
        const updatedTrain = {
            ...trainData,
            times: {
                arrival: new Date(trainData.arrival).toISOString(),
                departure: new Date(trainData.departure).toISOString()
            }
        };

        // Update state
        const updatedTrains = trains.map(t => t.trainNumber === editingTrain.trainNumber ? updatedTrain : t);
        setTrains(updatedTrains);
        setEditingTrain(null);
    };

    const handleCancel = () => {
        setEditingTrain(null);
    };

    const handleAddFormChange = (e) => {
        const { name, value } = e.target;
        setNewTrainData({
            ...newTrainData,
            [name]: value,
        });
    };

    const handleAddTrain = () => {
        const newTrain = {
            ...newTrainData,
            times: {
                arrival: new Date(newTrainData.arrival).toISOString(),
                departure: new Date(newTrainData.departure).toISOString()
            }
        };

        // Update state
        setTrains([...trains, newTrain]);
        setShowAddForm(false);
        setNewTrainData({
            trainNumber: '',
            trainName: '',
            startingPlace: '',
            destinationPlace: '',
            fare: '',
            seats: '',
            arrival: '',
            departure: '',
        });
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-indigo-900 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Train Number</th>
                        <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Train Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Starting Place</th>
                        <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Destination Place</th>
                        <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Fare</th>
                        <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Arrival</th>
                        <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Departure</th>
                        <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-indigo-700">
                    {trains.map((train, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{train.trainNumber}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{train.trainName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{train.startingPlace}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{train.destinationPlace}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{train.fare}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{new Date(train.times.arrival).toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{new Date(train.times.departure).toLocaleString()}</td>
                            <td className="px-8 py-4 whitespace-nowrap flex space-x-2">
                                <button onClick={() => handleEdit(train)} className="text-blue-600 hover:text-blue-800">
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleDelete(train)} className="text-red-600 hover:text-red-800">
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Modal */}
            {editingTrain && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                        <h2 className="text-lg font-semibold mb-4">Edit Train</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Train Name</label>
                                <input type="text" name="trainName" value={trainData.trainName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Starting Place</label>
                                <input type="text" name="startingPlace" value={trainData.startingPlace} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Destination Place</label>
                                <input type="text" name="destinationPlace" value={trainData.destinationPlace} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Fare</label>
                                <input type="number" name="fare" value={trainData.fare} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Arrival</label>
                                <input type="datetime-local" name="arrival" value={trainData.arrival} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Departure</label>
                                <input type="datetime-local" name="departure" value={trainData.departure} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button type="button" onClick={handleCancel} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">Cancel</button>
                                <button type="button" onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Train Form */}
            {showAddForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg ">
                        <h2 className="text-lg font-bold mb-2 ">Add Train</h2>
                        <form>
                            <div className="mb-1">
                                <label className="block text-sm font-medium text-gray-700">Train Number</label>
                                <input type="text" name="trainNumber" value={newTrainData.trainNumber} onChange={handleAddFormChange} className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">Train Name</label>
                                <input type="text" name="trainName" value={newTrainData.trainName} onChange={handleAddFormChange} className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">Starting Place</label>
                                <input type="text" name="startingPlace" value={newTrainData.startingPlace} onChange={handleAddFormChange} className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">Destination Place</label>
                                <input type="text" name="destinationPlace" value={newTrainData.destinationPlace} onChange={handleAddFormChange} className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">Seats</label>
                                <input type="number" name="seats" value={newTrainData.seats} onChange={handleAddFormChange} className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />

                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">Fare</label>
                                <input type="number" name="fare" value={newTrainData.fare} onChange={handleAddFormChange} className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">Arrival</label>
                                <input type="datetime-local" name="arrival" value={newTrainData.arrival} onChange={handleAddFormChange} className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">Departure</label>
                                <input type="datetime-local" name="departure" value={newTrainData.departure} onChange={handleAddFormChange} className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">Cancel</button>
                                <button type="button" onClick={handleAddTrain} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex justify-center mt-4 mb-4">
                <button type="button" onClick={() => setShowAddForm(true)} className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Add Train Data
                </button>
            </div>

        </div>
    );
};

export default Dashboard;
