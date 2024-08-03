import React from "react";
import Review from "../Review";

function RecentReviewsContainer() {
    // TEMP DUMMY DATA - TO BE REPLACED WITH ACTUAL DATA.
    // TODO: Trim Body Review if it gets really long. Let's say 100 characters maybe?
    const reviewsArray = [
        {
            username: "john_doe",
            body: "The product quality was exceptional and exceeded my expectations.",
            rating: "good"
        },
        {
            username: "jane_smith",
            body: "The service was average, nothing special but not bad either.",
            rating: "medium"
        },
        {
            username: "alex_jones",
            body: "I'm disappointed with the purchase, it didn't meet the advertised standards.",
            rating: "bad"
        }
    ];

    return (
        <div className="reviews-container">
            <h2>Recent Reviews</h2>
            {
                reviewsArray.map( (review, index) => (
                    <Review
                        key={index}
                        username={review.username}
                        body={review.body}
                        rating={review.rating}
                    /> 
                ))
            }
            
        </div>
    );
}

export default RecentReviewsContainer;