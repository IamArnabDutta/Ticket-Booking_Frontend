import React, { createContext, useState, useEffect } from 'react';
import data from '../data.json';

export const TrainDataContext = createContext([]);

const TrainDataProvider = ({ children }) => {
    const [trains, setTrains] = useState([]);

    useEffect(() => {

        setTrains(data);
    }, []);

    return (
        <TrainDataContext.Provider value={trains}>
            {children}
        </TrainDataContext.Provider>
    );
};

export default TrainDataProvider;
