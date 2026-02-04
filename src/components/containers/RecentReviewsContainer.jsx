import { useEffect, useState } from "react";
import Review from "../Review";
// import { supabase } from "../../supabaseClient";
import { fetchReviews } from "../../helpers";
import { useLocation } from "react-router-dom";
import ReviewSkeleton from "../ReviewSkeleton";

function RecentReviewsContainer({ user }) {
    // TODO: Trim Body Review if it gets really long. Let's say 100 characters maybe?
    const locationObj = useLocation();
    const currentUrl = locationObj.pathname;

    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect( () => {
        let isMounted = true;

        async function getReviews() {
            setIsLoading(true);
            let reviewData;
            if (currentUrl === "/") {
                reviewData = await fetchReviews();
            }

            if (currentUrl === "/profile" && user?.email) {
                reviewData = await fetchReviews(user.email);
            }

            if (isMounted) {
                setReviews(reviewData || []);
                setIsLoading(false);
            }
        }
        getReviews();
        return () => {
            isMounted = false;
        };
    }, [currentUrl, user]);

    return (
        <div className="reviews-container">
            { currentUrl === "/" && <h2>Recent Reviews</h2>}

            { isLoading ? (
                <>
                    <ReviewSkeleton/>
                    <ReviewSkeleton/>
                    <ReviewSkeleton/>
                </>
                ) : (
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
                )
            }

            
        </div>
    );
}

export default RecentReviewsContainer;