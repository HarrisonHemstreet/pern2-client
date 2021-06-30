import React, {useState, createContext} from "react";

export const CarsContext = createContext();

export const CarsContextProvider = props => {
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState([]);

    const addCars = (car) => {
        setCars([...cars, car])
    }

    return (
        <CarsContext.Provider value={{ cars, setCars, addCars, selectedCar, setSelectedCar }}>
            {props.children}
        </CarsContext.Provider>
    );
}

export default CarsContext;
