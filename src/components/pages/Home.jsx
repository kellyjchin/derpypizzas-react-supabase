import '../../styles/Homepage.css'
import React from "react";
import OrderTeaser from '../OrderTeaser';
import RecentReviewsContainer from '../containers/RecentReviewsContainer';

function Home({ user }) {

    return (
        <div className="homepage">
            { user ? <h1>DERPY PIZZAS - Hello {user.email}!</h1> :  <h1>DERPY PIZZAS</h1>}
            <div className='row-container'>
                <OrderTeaser user={user} />
                <RecentReviewsContainer/>
            </div>

        </div>
    );
}

export default Home;