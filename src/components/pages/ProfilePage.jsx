import React from "react";
import { Link } from 'react-router-dom';
import RecentReviewsContainer from "../containers/RecentReviewsContainer";
import RecentOrdersContainer from "../containers/RecentOrdersContainer";
import '../../styles/ProfilePage.css'

function ProfilePage({ user }) {

    return (
        <div className="profile-page">
            <h1>Welcome {user.email}</h1>
            <ul>
                <li><Link to="/review" className="cta">Leave a review!</Link></li>
                <li><Link to="/order" className="cta">Make an order!</Link></li>
            </ul>

            <div className="profile-page-inner-wrapper">
                <section>
                    <p>Here are all of the orders you've made</p>
                    <RecentOrdersContainer user={user}/>
                </section>

                <section>
                    <p>Here are all of the reviews you've ever made</p>
                    <RecentReviewsContainer user={user}/>
                </section>
            </div>


        </div>

    );
}

export default ProfilePage;