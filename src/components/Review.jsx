import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import '../styles/Review.css'

function Review( {username, body, rating, currentUrl, date, likesDislikes, reviewId, user } ) {

    const initialLikeStatus = likesDislikes.length > 0 ? likesDislikes[0].like_status : null;

    const [likeStatus, setLikeStatus] = useState(initialLikeStatus);
    const [likes, setLikes] = useState(likesDislikes.filter(like => like.like_status === 1).length);
    const [dislikes, setDislikes] = useState(likesDislikes.filter(like => like.like_status === -1).length);

    const handleLike = async () => {
        if (likeStatus === 1) return;
    
        // Update the like/dislike status in the database
        const { error } = await supabase
          .from('review_likes_dislikes')
          .upsert({
            review_id: reviewId,
            user_id: user.id,
            like_status: 1
          }, { onConflict: ['review_id', 'user_id'] });
    
        if (!error) {
          if (likeStatus === -1) setDislikes(dislikes - 1);
          setLikes(likes + 1);
          setLikeStatus(1);
        }
    };

    const handleDislike = async () => {
        if (likeStatus === -1) return;
    
        // Update the like/dislike status in the database
        const { error } = await supabase
          .from('review_likes_dislikes')
          .upsert({
            review_id: reviewId,
            user_id: user.id,
            like_status: -1
          }, { onConflict: ['review_id', 'user_id'] });
    
        if (!error) {
          if (likeStatus === 1) setLikes(likes - 1);
          setDislikes(dislikes + 1);
          setLikeStatus(-1);
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
                    className={likeStatus === 1 ? 'liked' : ''}
                    onClick={handleLike}
                    disabled={!user}
                >
                    Like ({likes})
                </button>

                <button
                    className={likeStatus === -1 ? 'disliked' : ''}
                    onClick={handleDislike}
                    disabled={!user}
                >
                    Dislike ({dislikes})
                </button>
            </div>
        </div>
    );

}

export default Review;