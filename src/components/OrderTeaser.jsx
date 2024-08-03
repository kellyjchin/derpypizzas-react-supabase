import React from "react";
import { Link } from 'react-router-dom';

// TO DO 
    // Better styling

function OrderTeaser({ user }) {

    return (
        <div className="order-teaser">
            <img src="/assets/pizza2.png" width="300px" height='300px' alt="AI Generated Pizza"></img>
            <div className="cta-container">
                <Link to='/order' className="cta">Order Pizza - no sign up required!</Link>
                { user && <Link to='/review' className="cta">Leave a Review!</Link> }
                
                { !user && <Link to='/sign-up' className="cta">Sign up or Login to leave us a review!</Link> }
                
            </div>
        </div>
    );
}

export default OrderTeaser;