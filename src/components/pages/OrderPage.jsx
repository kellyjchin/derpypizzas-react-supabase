import '../../styles/Homepage.css'
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { fetchRewardBalance, updateRewardPoints } from '../../helpers';
import RewardPointsDialog from '../RewardPointsDialog';
import '../../styles/OrderPage.css'

function OrderPage({ user }) {

    const [rewardBalance, setRewardBalance] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    useEffect( () => {
        const getRewardBalance = async () => {
            const rewardData = await fetchRewardBalance(user);
            if (!rewardData) return;
            const { reward_points: rewardPoints } = rewardData;
            setRewardBalance(rewardPoints);
            if(rewardPoints >= 100) setIsDialogOpen(true);
        }
        getRewardBalance();
    }, [user, rewardBalance])

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

    // TODO
    // error and success message handling
    
    const navigate = useNavigate();
    const handleSubmit = async e => {
        e.preventDefault();

        const submitBtnClicked = e.nativeEvent.submitter.name;
        const newOrder = {
            name: name,
            delivery_address: address,
            pizza_size: size,
            toppings: selectedToppings,
            quantity: quantity,
            total_price: totalPrice
        }



        if (!user) {
            navigate('/receipt', { state: newOrder} );
            return;
        }
          
        let { data: profileExists, error: profileError } = await supabase
        .from('profiles')
        .select('reward_points')
        .eq('user_id', user.id)
        .single();
        
        if (profileError && profileError.code !== 'PGRST116') {
            console.error('Error fetching user profile:', profileError);
            return;
        }
            
        if (profileExists && submitBtnClicked === "rewardSubmit") {
            totalPrice = 0;
            setRewardBalance( prevBalance => {
                const newBalance = prevBalance - 100;
                updateRewardPoints(user, totalPrice, newBalance);
                return newBalance;
            })
        } else if (profileExists && submitBtnClicked === "regularSubmit") {
            updateRewardPoints(user, totalPrice, rewardBalance);
        }

            
        if (!profileExists) {
            const { error } = await supabase.from('profiles').insert([
                { user_id: user.id, reward_points: totalPrice }
            ]);

            if (error) {
                console.error('Error fetching user profile:', error);
                return;
            }
        }

        newOrder.order_user = user.email;
        const { error } = await supabase.from('Order').insert([newOrder]);

        if (error) {
            console.error('Error inserting order:', error);
        } else {
            setName('');
            setAddress('');
            setSize('');
            setSizePrice(0);
            setToppingPrice(0);
            setSelectedToppings([]);
            setQuantity(1);
            navigate('/receipt', { state: newOrder} );
        }
    }

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <div className="order-page">
            { user && <div>Reward point balance: {rewardBalance}</div> }
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required value={name} onChange={handleNameChange}/><br /><br />

                <label htmlFor="address">Address to be delivered to:</label>
                <input type="text" id="address" name="address" required value={address} onChange={handleAddressChange}/><br /><br />

                <fieldset>
                    <legend>Pizza Size:</legend><br />
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
                </fieldset>

                <fieldset>
                    <legend>Pizza Toppings:</legend><br />
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
                </fieldset>
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

                <input className="cta" type="submit" name="regularSubmit" value="Order Pizza" />
                {
                    user && rewardBalance >= 100 &&
                    <input className="cta" type="submit" name="rewardSubmit" value="Use up 100 points and get your free meal!" />
                }
                
            </form>

            <Link to="/">Back to Home Page</Link>
            <RewardPointsDialog
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                points={rewardBalance}
            />
        </div>
    );
}

export default OrderPage;