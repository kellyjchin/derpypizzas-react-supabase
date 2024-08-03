import '../../styles/Homepage.css'
import React from "react";
import { Link } from 'react-router-dom';

function OrderPage() {
    return (
        <div className="order-page">
            <form action="/submit_order" method="POST">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required /><br /><br />

            <label htmlFor="address">Address to be delivered:</label>
            <input type="text" id="address" name="address" required /><br /><br />

            <label>Pizza Size:</label><br />
            <input type="radio" id="small" name="size" value="small" required />
            <label htmlFor="small">Small</label><br />
            <input type="radio" id="medium" name="size" value="medium" />
            <label htmlFor="medium">Medium</label><br />
            <input type="radio" id="large" name="size" value="large" />
            <label htmlFor="large">Large</label><br /><br />

            <label>Pizza Toppings:</label><br />
            <input type="checkbox" id="pepperoni" name="toppings" value="pepperoni" />
            <label htmlFor="pepperoni">Pepperoni</label><br />
            <input type="checkbox" id="mushrooms" name="toppings" value="mushrooms" />
            <label htmlFor="mushrooms">Mushrooms</label><br />
            <input type="checkbox" id="onions" name="toppings" value="onions" />
            <label htmlFor="onions">Onions</label><br />
            <input type="checkbox" id="sausage" name="toppings" value="sausage" />
            <label htmlFor="sausage">Sausage</label><br />
            <input type="checkbox" id="bacon" name="toppings" value="bacon" />
            <label htmlFor="bacon">Bacon</label><br /><br />

            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" name="quantity" min="1" max="10" required /><br /><br />

            <input type="submit" value="Order Pizza" />
            </form>

            <Link to="/">Back to Home Page</Link>
        </div>
    );
}

export default OrderPage;