import React  from 'react';

function AboutUs() {
    return (
        <>
            <h1>Hi there! This is not a real food ordering app! It's just a portfolio project.</h1>
            <p>This project was built with React and Firebase. Project features include:</p>
            <ul>
                <li>Being a Single Page Application.</li>
                <li>CRUD functionality for "Food orders".</li>
                <li>CRUD functionality for "Food Reviews" and comments for each Review.</li>
                <li>Getting all orders from a logged in user.</li>
                <li>Getting all reviews from a logged in user.</li>
                <li>Login / Authentication</li>
            </ul>
        </>
    );
}

export default AboutUs;