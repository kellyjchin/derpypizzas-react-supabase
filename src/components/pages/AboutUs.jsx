import React  from 'react';

function AboutUs() {
    return (
        <>
            <h1>Hi there! This is not a real food ordering app! It's just a portfolio project.</h1>
            <p>This project was built with React and Supabase. Project features include:</p>
            <ul>
                <li>Being a Single Page Application.</li>
                <li>CRUD functionality for Ordering Pizzas.</li>
                <li>CRUD functionality for Reviews and being able to like/dislike a review.</li>
                <li>Listing all orders from a logged in user.</li>
                <li>Listing all reviews from a logged in user.</li>
                <li>Login / Authentication</li>
            </ul>
        </>
    );
}

export default AboutUs;