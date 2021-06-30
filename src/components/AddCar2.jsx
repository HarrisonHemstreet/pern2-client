import React, {useState, useContext} from 'react';
import CarFinder from "../apis/CarFinder";
import { CarsContext } from "../context/CarsContext";

const AddCar = () => {
	const { addCars } = useContext(CarsContext);
	const [make,setMake] = useState("");
	const [model, setModel] = useState("");
	const [priceRange, setPriceRange] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await CarFinder.post("/", {
				make,
				model,
				price_range: priceRange,
			});
			addCars(response.data.data.car);
			console.log(response);
		} catch (err) {
			console.log(err);
		}
	}
	
	return (
		// {/* <div className="container"> */}
		// 	<div className="row">
		<div className="mb-4">
			<form action="">
				<div className="form-row">
					<div className="col">
						<input value={make} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="Make"/>
					</div>
					<div className="col">
						<input value={model} onChange={e => setLocation(e.target.value)} className="form-control" type="text" placeholder="Model" />
					</div>
					<div className="col">
						<select value={priceRange} onChange={e => setPriceRange(e.target.value)}className="form-control custom-select my-1 mr-sm-2">
							<option disabled>Price Range</option>
							<option value="1">$</option>
							<option value="2">$$</option>
							<option value="3">$$$</option>
							<option value="4">$$$$</option>
							<option value="5">$$$$$</option>
						</select>
					</div>
					<button onClick={handleSubmit} className="col btn btn-primary">Add</button>
				</div>
			</form>
		</div>
		// </div>
		// </div>

	)
}

export default AddCar;
