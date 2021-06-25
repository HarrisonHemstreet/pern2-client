import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import CarFinder from "../apis/CarFinder";
import { CarsContext } from "../context/CarsContext";

const UpdateCar = () => {
	const { id } = useParams();
	let history = useHistory();
	const { cars } = useContext(CarsContext);
	const [make, setMake] = useState("");
	const [model, setModel] = useState("");
	const [priceRange, setPriceRange] = useState("");

	useEffect(() => {
		const fetchData = async() => {
			const response = await CarFinder.get(`/${id}`);
			setMake(response.data.data.car.make);
			setModel(response.data.data.car.model);
			setPriceRange(response.data.data.car.price_range);
		}
		fetchData();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const updatedCar = await CarFinder.put(`/${id}`, {
			make,
			model,
			price_range: priceRange
		});
		history.push("/");
	}

	return (
		<div>
			<form action="">
				<div className="form-group">
					<label htmlFor="make">Make</label>
					<input value={make} onChange={e => setMake(e.target.value)} id="make" className="form-control" type="text" />
				</div>
				<div className="form-group">
					<label htmlFor="model">Model</label>
					<input value={model} onChange={e => setModel(e.target.value)} id="model" className="form-control" type="text" />
				</div>
				<div className="form-group">
					<label htmlFor="price_range">Price Range</label>
					<input value={priceRange} onChange={e => setPriceRange(e.target.value)}id="price_range" className="form-control" type="number" />
				</div>
				<button onClick={handleSubmit} className="btn btn-primary">Submit</button>
			</form>
		</div>
	)
}

export default UpdateCar;
