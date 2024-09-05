import React, { useEffect, useState } from "react";
import Review from "../Review";
// import { supabase } from "../../supabaseClient";
import { fetchReviews } from "../../helpers";
import { useLocation } from "react-router-dom";

function RecentReviewsContainer({ user }) {
    // TODO: Trim Body Review if it gets really long. Let's say 100 characters maybe?
    const locationObj = useLocation();
    const currentUrl = locationObj.pathname;

    const [reviews, setReviews] = useState([]);
    useEffect( () => {
        async function getReviews() {
            let reviewData;
            if (currentUrl === "/") {
                reviewData = await fetchReviews();
            }

            if (currentUrl === "/profile") {
                reviewData = await fetchReviews(user.email);
            }

            if(reviewData) {
                setReviews(reviewData);
            }
        }
        getReviews();
    }, [currentUrl, user]);

    return (
        <div className="reviews-container">
            <h2>Recent Reviews</h2>
            {reviews ?
                reviews.map( (review, index) => (
                    <Review
                        key={index}
                        username={review.reviewer}
                        body={review.review_body}
                        rating={review.rating}
                        date={'derp'}
                        currentUrl={currentUrl}
                        reviewId={review.id}
                        user={user}
                        inLikeCount={review.likeCount}
                        inDislikeCount={review.dislikeCount}
                    /> 
                ))

                :
                <p>Loading Reviews...</p>
            }
            
        </div>
    );
}

export default RecentReviewsContainer;