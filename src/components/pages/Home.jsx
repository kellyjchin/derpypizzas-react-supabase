import '../../styles/Homepage.css'
import React from "react";
import OrderTeaser from '../OrderTeaser';
import RecentReviewsContainer from '../containers/RecentReviewsContainer';

function Home({ user }) {

    return (
        <div className="homepage">
            <h1>DERPY PIZZAS</h1>
            { user && <p className='welcome-msg'>Welcome {user.email}</p>}
            <div className='row-container'>
                <OrderTeaser user={user} />
                <RecentReviewsContainer/>
            </div>

        </div>
    );
}

export default Home;