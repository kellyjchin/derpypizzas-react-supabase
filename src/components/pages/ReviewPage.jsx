import React from "react";
import { Link } from "react-router-dom";

// TO DO - Make this page only accessible to logged in users
function ReviewPage() {
    return (
        <div className="review-page">
            <form action="/submit_review" method="POST">
                <div className="form-elem-wrapper">
                    <label htmlFor="review">Leave us a Review!</label><br />
                    <textarea id="review" name="review" rows="4" cols="50" placeholder="How was your experience with us?"></textarea>
                </div>

                <div className="form-elem-wrapper">
                    <label htmlFor="rating">Give us a rating!</label><br />
                    <select id="rating" name="rating" required>
                        <option value="bad">Could be better</option>
                        <option value="med">It was alright</option>
                        <option value="good">Best pizza in town!</option>
                    </select>
                </div>

            </form>

            <Link to="/">Back to Home Page</Link>
        </div>
    );
}

export default ReviewPage;