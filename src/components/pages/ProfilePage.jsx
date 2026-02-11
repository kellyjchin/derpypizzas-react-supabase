import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
// import RecentReviewsContainer from "../containers/RecentReviewsContainer";
import RecentOrdersContainer from "../containers/RecentOrdersContainer";
import '../../styles/ProfilePage.css'
import { fetchRewardBalance } from "../../helpers";
import RecentReviewsContainer from "../containers/RecentReviewsContainer";

function ProfilePage({ user }) {
    const [rewardBalance, setRewardBalance] = useState(0);
    useEffect( () => {
        const getRewardBalance = async () => {
            const rewardData = await fetchRewardBalance(user);
            if (!rewardData) return;
            const { reward_points: rewardPoints } = rewardData;
            setRewardBalance(rewardPoints);
        }
        getRewardBalance();
    }, [user])

    return (
        <div className="profile-page">
            <h1>Welcome {user.email}</h1>
            <span>Point Balance: {rewardBalance}</span>
            <ul className="links">
                <li><Link to="/review" className="cta">Leave a review!</Link></li>
                <li><Link to="/order" className="cta">Make an order!</Link></li>
            </ul>

            <div className="profile-page-inner-wrapper">
                <RecentOrdersContainer user={user}/>
                <RecentReviewsContainer user={user} isProfilePage={true} paginationBtns={true}/>
            </div>
        </div>

    );
}

export default ProfilePage;