import React, { useState } from "react";
import CarFinder from "../apis/CarFinder";
import { useLocation, useParams, useHistory } from "react-router-dom";

const AddReview = () => {
	const { id } = useParams();
	const location = useLocation();
	const history = useHistory();

	const [name, setName] = useState("");
	const [reviewText, setReviewText] = useState("");
	const [rating, setRating] = useState("Rating");

	const handleSubmitReview = async (e) => {
		console.log("in here");
		e.preventDefault();
		try {
			await CarFinder.post(`/${id}/addReview`, {
				name,
				review: reviewText,
				rating,
			});
			history.push("/");
			history.push(location.pathname);
		} catch (err) {
			console.log(err);
		}
		// console.log(response);
	}

	return (
		<div className="mb-2">
			<form action="">
				<div className="form-row">
					<div className="form-group col-8">
						<label htmlFor="name">Name</label>
						<input value={name} onChange={e => setName(e.target.value)} id="name" placeholder="name" type="text" className="form-control" />
					</div>
					<div className="form-group col-4">
						<label htmlFor="rating">Rating</label>
						<select value={rating} onChange={e => setRating(e.target.value)} id="rating" className="custom-select">
							<option disabled>Rating</option>
							<option volume="1">1</option>
							<option volume="2">2</option>
							<option volume="3">3</option>
							<option volume="4">4</option>
							<option volume="5">5</option>
						</select>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="Review">Review</label>
					<textarea value={reviewText} onChange={e => setReviewText(e.target.value)} id="Review" className="form-control"></textarea>
				</div>
				<button onClick={handleSubmitReview} className="btn btn-primary">Submit</button>
			</form>
		</div>
	)
}

export default AddReview;
