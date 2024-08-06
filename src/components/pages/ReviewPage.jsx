import React, { useState } from "react";
import { supabase } from '../../supabaseClient';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ReviewPage({ user }) {

    const [reviewBody, setReviewBody] = useState('');
    const [rating, setRating] = useState('Could be better'); 
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        if(!user) {
            setError("You must be logged in to leave a review");
            return;
        }

        setError(null);
        setSuccessMessage('');

        const newReview = {
            reviewer: user.email,
            review_body: reviewBody,
            rating: rating
        }

        const { data, error } = await supabase
            .from('Review')
            .insert([newReview]);

        if (error) {
            setError('Failed to submit review. Please try again.');
            console.error('Error inserting review:', error);
        } else {
            setSuccessMessage('Review submitted successfully!');
            setReviewBody('');
            setRating(''); // Reset rating to default
            navigate('/');
        }
    }

    return (
        <div className="review-page">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-elem-wrapper">
                    <label htmlFor="reviewBody">Leave us a Review!</label><br />
                    <textarea 
                        id="reviewBody" 
                        name="reviewBody" 
                        rows="4" 
                        cols="50" 
                        placeholder="How was your experience with us?"
                        required
                        value={reviewBody}
                        onChange={e => setReviewBody(e.target.value)}
                    >
                    </textarea>
                </div>

                <div className="form-elem-wrapper">
                    <label htmlFor="rating">Give us a rating!</label><br />
                    <select 
                        id="rating" 
                        name="rating" 
                        required
                        value={rating}
                        onChange={ e => setRating(e.target.value) }
                    >
                        <option value={"Could be better"}>Could be better</option>
                        <option value={"It was alright"}>It was alright</option>
                        <option value={"Best pizza in town!"}>Best pizza in town!</option>
                    </select>
                </div>
                <input type="submit" value="Add Review!" ></input>
            </form>

            <Link to="/">Back to Home Page</Link>
        </div>
    );
}

export default ReviewPage;