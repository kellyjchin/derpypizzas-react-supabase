import React from "react";
import { Link } from 'react-router-dom';
import RecentReviewsContainer from "../containers/RecentReviewsContainer";
import RecentOrdersContainer from "../containers/RecentOrdersContainer";

function ProfilePage({ user }) {

    return (
        <div>
            <h1>Welcome {user.email}</h1>
            <div>
                <ul>
                    <li><Link to="/review" className="cta">Leave a review!</Link></li>
                    <li><Link to="/order" className="cta">Make an order!</Link></li>
                </ul>
            </div>

            <p>Here are all of the orders you've made</p>
            <RecentOrdersContainer user={user}/>
            <p>Here are all of the reviews you've ever made</p>
            <RecentReviewsContainer user={user}/>
        </div>

    );
}

export default ProfilePage;