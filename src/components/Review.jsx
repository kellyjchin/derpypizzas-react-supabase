import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import '../styles/Review.css'
// TODO - make profileID variable accessible everywhere in the app, rather than relying on user
function Review( {username, body, rating, date, reviewId, user, inLikeCount, inDislikeCount, isProfilePage, profileId, onOpenComments } ) {

    const [likeCount, setLikeCount] = useState(inLikeCount);
    const [dislikeCount, setDislikeCount] = useState(inDislikeCount);
    const [userLikeStatus, setUserLikeStatus] = useState(null); // 1 = like, -1 = dislike, null = no action

    useEffect(() => {
        // Check if the current user has already liked or disliked this review
        const fetchUserLikeStatus = async () => {
          if (profileId) {
            const { data, error } = await supabase
              .from('review_likes_dislikes')
              .select('like_status')
              .eq('profile_id', profileId)
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
            profile_id: profileId,
            review_id: reviewId,
            like_status: 1
        }, { onConflict: ['profile_id', 'review_id'] });

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
          profile_id: profileId,
          review_id: reviewId,
          like_status: -1
        }, { onConflict: ['profile_id', 'review_id'] });

        if (!error) {
            setDislikeCount(prev => (userLikeStatus === 1 ? prev + 1 : prev + 1)); // Increment the dislike count
            if (userLikeStatus === 1) setLikeCount(prev => prev - 1); // If switching from like, decrement like count
            setUserLikeStatus(-1); // Update local like status
        }
    };

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',  
        day: 'numeric'
    });

    return (
        <div className="review">
            <div className="rating">
                <strong>Rating: </strong>{rating}
            </div>

            <div className="review-body">
                <em>{body}</em>
            </div>

            {
                !isProfilePage && 
                <div className="user-name">
                  <strong>Written by: </strong> {username}
                </div>
            }

            <strong className="date-created">{formattedDate}</strong>

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

                <button 
                    className="see-comments-btn"
                    onClick={onOpenComments}
                >
                    Comments
                </button>
            </div>
        </div>
    );

}

export default Review;