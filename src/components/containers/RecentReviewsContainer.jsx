import { useEffect, useState } from "react";
import Review from "../Review";
import { fetchRecentReviewsAllUsers, fetchUserReviewsPaginated } from "../../helpers";
import ReviewSkeleton from "../ReviewSkeleton";
import CommentDialog from "../CommentDialog";

function RecentReviewsContainer({ user, isProfilePage, paginationBtns }) {
    // TODO: Trim Body Review if it gets really long. Let's say 100 characters maybe?

    const [selectedReview, setSelectedReview] = useState(null);

    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalReviews, setTotalReviews] = useState(30);

    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 3;

    const offset = (currentPage - 1) * reviewsPerPage;
    const totalPages = Math.ceil(totalReviews / reviewsPerPage);
    useEffect( () => {
        let isMounted = true;

        async function getReviews() {
            setIsLoading(true);
            let reviewData;
            if (!isProfilePage) {
                reviewData = await fetchRecentReviewsAllUsers();
            }

            if (isProfilePage && user?.email) {
                reviewData = await fetchUserReviewsPaginated({
                    userEmail: user.email,
                    limit: reviewsPerPage,
                    offset
                });
                setTotalReviews(reviewData.total)
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
    }, [user, currentPage]);

    return (
        <div className="reviews-container">
            { isProfilePage ? <h3>Your recent reviews:</h3> : <h2>Recent Reviews</h2>}
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
                            date={review.created_at}
                            reviewId={review.id}
                            user={user}
                            inLikeCount={review.likeCount}
                            inDislikeCount={review.dislikeCount}
                            isProfilePage={isProfilePage}
                            onOpenComments={() => setSelectedReview(review)}
                        /> 
                    ))
                )
                        
            }
            { paginationBtns && 
                <div className="btn-container">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="liked"
                    >
                        Previous
                    </button>

                    <span> Page {currentPage} of {totalPages} </span>

                    <button
                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="liked"
                    >
                        Next
                    </button>
                </div>
            }
            <CommentDialog
                isOpen={!!selectedReview}
                onClose={() => setSelectedReview(null)}
                review={selectedReview}
            />   
         
        </div>
    );
}

export default RecentReviewsContainer;