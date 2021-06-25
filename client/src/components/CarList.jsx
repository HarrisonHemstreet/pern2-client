import React, {useEffect, useContext} from 'react';
import "./CarList.css";
import CarFinder from "../apis/CarFinder";
import { CarsContext } from "../context/CarsContext";
import { useHistory } from "react-router-dom";
import StarRating from "../components/StarRating";

const CarList = (props) => {
	const {cars, setCars} = useContext(CarsContext);
	let history = useHistory();
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await CarFinder.get("/");
				setCars(response.data.data.cars);
			} catch (err) {}
		}
		fetchData();
	}, []);

	const handleDelete = async (e, id) => {
		e.stopPropagation();
		try {
			const response = await CarFinder.delete(`/${id}`);	
			setCars(cars.filter(car => {
				return car.id !== id
			}));
		} catch (err) {
			console.log(err);
		}
	}

	const handleUpdate = (e, id) => {
		e.stopPropagation();
		history.push(`/cars/${id}/update`);
	}

	const handleCarSelect = (id) => {
		console.log("SELECTING A CAR");
		history.push(`/cars/${id}`);
	}

	const renderRating = (car) => {

		if(!car.count) {
			return <span className="text-warning">0 reviews</span>
		}
		return (
			<>
				<StarRating rating={car.average_rating}/>

				<span className="text-warning ml-1">{car.count}</span>
			</>
		);
	}

	return (
		<div className="list-group">
			<table className="table table-hover table-dark table-striped">
				<thead>
			    <tr className="bg-primary">
			      <th scope="col">Make</th>
			      <th scope="col">Model</th>
			      <th scope="col">Price Range</th>
			      <th scope="col">Ratings</th>
			      <th scope="col">Edit</th>
			      <th scope="col">Delete</th>
			    </tr>
			  </thead>
			  <tbody>
				  {cars && cars.map(car => {
					  return (
						  <tr onClick={() => handleCarSelect(car.id)} key={car.id}>
					  		    <td>{car.make}</td>
					  		    <td>{car.model}</td>
					  		    <td>{"$".repeat(car.price_range)}</td>
					  		    <td>{renderRating(car)}</td>
					  		    <td>
									<button onClick={(e) => handleUpdate(e, car.id)}className="btn btn-warning">Update</button>
					  		    </td>
					  		    <td>
									<button onClick={(e) => handleDelete(e, car.id)} className="btn btn-danger">Delete</button>
					  		    </td>
					  		</tr>
					  )
				  })}
			  </tbody>
			</table >	
		</div>
	)
}

export default CarList;
