import React, { useEffect, useState } from "react";
import Review from "../Review";
import { supabase } from "../../supabaseClient";

function RecentReviewsContainer() {
    // TEMP DUMMY DATA - TO BE REPLACED WITH ACTUAL DATA.
    // TODO: Trim Body Review if it gets really long. Let's say 100 characters maybe?

    const [reviews, setReviews] = useState([]);
    useEffect( () => {
        async function fetchReviews() {
            const { data, error } = await supabase
              .from('Review')
              .select('*')
              .limit(3)
              .order('created_at', { ascending: false }) // Order by created_at descending
      
            if (error) {
              console.error('Error fetching reviews:', error);
            } else {
              setReviews(data);
              console.log(data);
            }
        }
        fetchReviews();
    }, []);

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
                    /> 
                ))

                :
                <p>Loading Recent reviews...</p>
            }
            
        </div>
    );
}

export default RecentReviewsContainer;