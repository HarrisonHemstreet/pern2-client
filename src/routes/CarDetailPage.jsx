import React, { useContext, useEffect } from 'react';
import "./CarDetailPage.css";
import { useParams } from "react-router-dom";
import { CarsContext } from "../context/CarsContext";
import CarFinder from "../apis/CarFinder";
import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

const CarDetailPage = () => {
	const { id } = useParams();
	const { selectedCar, setSelectedCar } = useContext(CarsContext);

	useEffect(() => {
		const fetchData = async () => {
			try {

			const response = await CarFinder.get(`/${id}`);
			const carInfo = response.data.data;

			console.log(carInfo, "CAR INFO");

			setSelectedCar(carInfo);

			} catch (err) {
				console.log(err);
			}
		}
		fetchData();
	}, []);
	return (
		<div className="containerCarDetail">
			{selectedCar && selectedCar.car && (
				<div className="">
					<h1 className="text-center display-1">{selectedCar.car.name}</h1>
					<div className="text-center">
						<StarRating rating={selectedCar.car.average_rating} />
						<span className="text-warning ml-1">
							{selectedCar.car.count ? `(${selectedCar.car.count})` : "(0)"}
						</span>
					</div>
					<div className="mt-3">
						<Reviews reviews={selectedCar.reviews}/>
					</div>
					<AddReview />
				</div>
			)}
		</div>
	)
}

export default CarDetailPage;
