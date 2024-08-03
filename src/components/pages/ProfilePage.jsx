import React from "react";
import { Link } from 'react-router-dom';

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
            <p>Here are all of the reviews you've ever made</p>
        </div>

    );
}

export default ProfilePage;