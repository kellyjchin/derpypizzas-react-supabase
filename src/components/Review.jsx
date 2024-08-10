import React from "react";
import '../styles/Review.css'

function Review( {username, body, rating, currentUrl, date} ) {


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
        </div>
    );

}

export default Review;