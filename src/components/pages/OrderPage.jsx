import '../../styles/Homepage.css'
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

function OrderPage({ user }) {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const handleNameChange = e => {
        const name = e.target.value;
        setName(name);
    }

    const [address, setAddress] = useState('');
    const handleAddressChange = e => {
        const address = e.target.value;
        setAddress(address);
    }

    const [sizePrice, setSizePrice] = useState(0);
    const [size, setSize] = useState('');
    const handleSizeChange = e => {
        const sizePrice = parseFloat(e.target.dataset.price);
        const size = e.target.value;
        setSizePrice( sizePrice );
        setSize(size);
    }

    const [toppingPrice, setToppingPrice] = useState(0);
    const [selectedToppings, setSelectedToppings] = useState([])
    const handleToppingChange = e => {
        const toppingPrice = parseFloat(e.target.dataset.price);
        const toppingName = e.target.value;

        if (e.target.checked) {
            setToppingPrice( prevPrice => prevPrice + toppingPrice );
            setSelectedToppings( prevToppings => [...prevToppings, toppingName])
        } else {
            setToppingPrice( prevPrice => prevPrice - toppingPrice );
            setSelectedToppings( prevToppings => prevToppings.filter( topping => topping !== toppingName) )
        }
    }

    const [quantity, setQuantity] = useState(1);
    const handleQuantityChange = e => {
        const quantity = parseFloat(e.target.value);
        setQuantity( quantity );
    }

    let totalPrice = (toppingPrice + sizePrice) * quantity;

    const handleSubmit = async e => {
        // TODO
        // error and success message handling

        e.preventDefault();

        const newOrder = {
            name: name,
            delivery_address: address,
            pizza_size: size,
            toppings: selectedToppings,
            quantity: quantity,
            total_price: totalPrice
        }
        
        if (user) {
            newOrder.order_user = user.email;
            const { error } = await supabase.from('Order').insert([newOrder]);

            if (error) {
                // setError('Failed to submit order. Please try again.');
                console.error('Error inserting order:', error);
            } else {
                // setSuccessMessage('Review submitted successfully!');
                setName('');
                setAddress('');
                setSize('');
                setSizePrice(0);
                setToppingPrice(0);
                setSelectedToppings([]);
                setQuantity(1);
            }
        }

        navigate('/receipt', { state: newOrder} )
    }

    return (
        <div className="order-page">
            <div>selected size - {size}</div>
            <div>name is {name}</div>
            <div>address: {address}</div>
            {/* <div className='selected-tops'>
                {
                    selectedToppings.map( topping => (
                        <li>{topping}</li>
                    ))
                }

            </div> */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required value={name} onChange={handleNameChange}/><br /><br />

                <label htmlFor="address">Address to be delivered:</label>
                <input type="text" id="address" name="address" required value={address} onChange={handleAddressChange}/><br /><br />

                <label>Pizza Size:</label><br />
                <input 
                    type="radio" 
                    id="small" 
                    name="size" 
                    value="small" 
                    data-price="5"
                    required
                    onChange={handleSizeChange}
                />
                <label htmlFor="small">Small - $5.00</label><br />

                <input
                type="radio"
                id="medium"
                name="size"
                value="medium"
                data-price="8"
                required
                onChange={handleSizeChange}
                />
                <label htmlFor="medium">Medium - $ 8.00</label><br />



                <input
                type="radio"
                id="large"
                name="size"
                value="large"
                data-price="10"
                required
                onChange={handleSizeChange}
                />
                <label htmlFor="large">Large - $10</label><br /><br />

                <label>Pizza Toppings:</label><br />
                <input 
                    type="checkbox" 
                    id="pepperoni" 
                    name="toppings" 
                    value="pepperoni" 
                    data-price="4"
                    onChange={handleToppingChange}
                />
                <label htmlFor="pepperoni">Pepperoni - $4</label><br />
                
                <input 
                    type="checkbox" 
                    id="mushrooms" 
                    name="toppings" 
                    value="mushrooms" 
                    data-price="2"
                    onChange={handleToppingChange}
                />
                <label htmlFor="mushrooms">Mushrooms - $2</label><br />
                
                <input 
                    type="checkbox" 
                    id="onions" 
                    name="toppings" 
                    value="onions" 
                    data-price="2"
                    onChange={handleToppingChange}
                />
                <label htmlFor="onions">Onions - $2</label><br />
                
                <input 
                    type="checkbox" 
                    id="sausage" 
                    name="toppings" 
                    value="sausage" 
                    data-price="4"
                    onChange={handleToppingChange}
                />
                <label htmlFor="sausage">Sausage - $4</label><br />
                
                <input 
                    type="checkbox" 
                    id="bacon" 
                    name="toppings" 
                    value="bacon" 
                    data-price="4"
                    onChange={handleToppingChange}
                />
                <label htmlFor="bacon">Bacon - $4</label><br /><br />

                <label htmlFor="quantity">Quantity:</label>
                <input 
                    type="number" 
                    id="quantity" 
                    name="quantity" 
                    min="1" max="10" 
                    value={quantity}
                    required 
                    onChange={handleQuantityChange}
                />
                <br /><br />

                <div>Your current total is: ${totalPrice}</div>

                <input type="submit" value="Order Pizza" />
            </form>

            <Link to="/">Back to Home Page</Link>
        </div>
    );
}

export default OrderPage;