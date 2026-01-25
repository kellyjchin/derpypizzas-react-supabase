import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Disclosure, DisclosurePanel, DisclosureButton } from "@headlessui/react";
import RecentReviewsContainer from "../containers/RecentReviewsContainer";
import RecentOrdersContainer from "../containers/RecentOrdersContainer";
import '../../styles/ProfilePage.css'
import { fetchOrders, fetchRewardBalance } from "../../helpers";

function ProfilePage({ user }) {
    const [orders, setOrders] = useState([]);
    useEffect( () => {
        async function getOrders() {
            let ordersData = await fetchOrders(user.email);
            if(ordersData) {
                setOrders(ordersData);
            }
        }
        getOrders();
    }, []);

    const [rewardBalance, setRewardBalance] = useState(0);
    useEffect( () => {
        const getRewardBalance = async () => {
            const rewardData = await fetchRewardBalance(user);
            if (!rewardData) return;
            const { reward_points: rewardPoints } = rewardData;
            setRewardBalance(rewardPoints);
        }
        getRewardBalance();
    }, [user, rewardBalance])

    return (
        <div className="profile-page">
            <h1>Welcome {user.email}</h1>
            <span>Point Balance: {rewardBalance}</span>
            <ul className="links">
                <li><Link to="/review" className="cta">Leave a review!</Link></li>
                <li><Link to="/order" className="cta">Make an order!</Link></li>
            </ul>

            <div className="profile-page-inner-wrapper">
                <section>
                    <h3>Your recent orders:</h3>
                    <table>
                        <thead>
                            <th>Date</th>
                            <th>For</th>
                            <th>Delivery Address</th>
                            <th>Size</th>
                            <th>Toppings</th>
                            <th>Qty.</th>
                            <th>Total Price</th>
                        </thead>
                        <tbody>
                            {orders ?

                                orders.map( (order, index) => {
                                    const dateCreated = new Date(order.created_at);
                                    
                                    return(
                                        <tr>
                                            <td>{dateCreated.toLocaleDateString()}</td>
                                            <td>{order.name}</td>
                                            <td>{order.delivery_address}</td>
                                            <td>{order.pizza_size}</td>
                                            <td>{order.toppings ? order.toppings.join(', ') : "no toppings"}</td>
                                            <td>{order.quantity}</td>
                                            <td>{order.total_price.toFixed(2)}</td>
                                        </tr>
                                    )
                                })

                                :
                                <tr><td>Loading Orders...</td></tr>
                            }
                        </tbody>
                    </table>
                </section>
            </div>


        </div>

    );
}

export default ProfilePage;