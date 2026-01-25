import React, { useEffect, useState } from "react";
import { fetchOrders } from "../../helpers";

function RecentOrdersContainer({ user }) {

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

    return (
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
                            const {name, delivery_address, pizza_size, toppings, quantity, total_price} = order;
                            return(
                                <tr>
                                    <td>{dateCreated.toLocaleDateString()}</td>
                                    <td>{name}</td>
                                    <td>{delivery_address}</td>
                                    <td>{pizza_size}</td>
                                    <td>{toppings ? toppings.join(', ') : "no toppings"}</td>
                                    <td>{quantity}</td>
                                    <td>{total_price.toFixed(2)}</td>
                                </tr>
                            )
                        })

                        :
                        <tr><td>Loading Orders...</td></tr>
                    }
                </tbody>
            </table>
        </section>
    );
}

export default RecentOrdersContainer;