import React from 'react';
import Header from "../components/Header";
import AddCar from "../components/AddCar";
import CarList from "../components/CarList";
import "./Home.css";

const Home = () => {
	return (
		<>

		<div className="container">
			<AddCar />
			<CarList />
		</div>
		</>
	)
}

export default Home;
