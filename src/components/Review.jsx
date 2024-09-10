import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import '../styles/Review.css'

function Review( {username, body, rating, currentUrl, date, reviewId, user, inLikeCount, inDislikeCount } ) {

    const [likeCount, setLikeCount] = useState(inLikeCount);
    const [dislikeCount, setDislikeCount] = useState(inDislikeCount);
    const [userLikeStatus, setUserLikeStatus] = useState(null); // 1 = like, -1 = dislike, null = no action

    useEffect(() => {
        // Check if the current user has already liked or disliked this review
        const fetchUserLikeStatus = async () => {
          if (user) {
            const { data, error } = await supabase
              .from('review_likes_dislikes')
              .select('like_status')
              .eq('user_id', user.id)
              .eq('review_id', reviewId)
              .single();
    
            if (!error && data) {
              setUserLikeStatus(data.like_status); // Set the user's current like/dislike status
            }
          }
        };
    
        fetchUserLikeStatus();
    }, [reviewId, user]);

    const handleLike = async () => {
        if (userLikeStatus === 1) return;
        let { error } = await supabase
        .from('review_likes_dislikes')
        .upsert({
            user_id: user.id,
            review_id: reviewId,
            like_status: 1
        }, { onConflict: ['user_id', 'review_id'] });

        if (!error) {
            setLikeCount(prev => (userLikeStatus === -1 ? prev + 1 : prev + 1)); // Increment the like count
            if (userLikeStatus === -1) setDislikeCount(prev => prev - 1); // If switching from dislike, decrement dislike count
            setUserLikeStatus(1); // Update local like status
        }
    };

    const handleDislike = async () => {
        if (userLikeStatus === -1) return;
    
        let { error } = await supabase
        .from('review_likes_dislikes')
        .upsert({
          user_id: user.id,
          review_id: reviewId,
          like_status: -1
        }, { onConflict: ['user_id', 'review_id'] });

        if (!error) {
            setDislikeCount(prev => (userLikeStatus === 1 ? prev + 1 : prev + 1)); // Increment the dislike count
            if (userLikeStatus === 1) setLikeCount(prev => prev - 1); // If switching from like, decrement like count
            setUserLikeStatus(-1); // Update local like status
        }
    };

    return (
        <div className="review">

            {
                currentUrl === "/" ? 
                <div className="user-name">
                    {username}
                </div>
                :
                ''
            }

            <div className="review-body">
                {body}
            </div>

            <div className="rating">
                {rating}
            </div>

            <div className="like-dislike-container">
                <button
                    className={`like-button ${user && userLikeStatus === 1 ? 'liked' : ''}`}
                    onClick={handleLike}
                    disabled={!user || userLikeStatus === 1}
                >
                    {user && userLikeStatus === 1 ? 'Liked' : 'Like'} ({likeCount})
                </button>

                <button
                    className={`dislike-button ${user && userLikeStatus === -1 ? 'disliked' : ''}`}
                    onClick={handleDislike}
                    disabled={!user || userLikeStatus === -1}
                >
                    {user && userLikeStatus === -1 ? 'Disliked' : 'Dislike'} ({dislikeCount})
                </button>
            </div>
        </div>
    );

}

export default Review;