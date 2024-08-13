import React, { useEffect, useState } from "react";
import Order from "../Order";
import { supabase } from "../../supabaseClient";
import { fetchOrders } from "../../helpers";
import { useLocation } from "react-router-dom";

function RecentOrdersContainer({ user }) {

    const [orders, setOrders] = useState([]);
    useEffect( () => {
        async function getOrders() {
            let ordersData = await fetchOrders(user.email);
            if(ordersData) {
                console.log(ordersData);
                setOrders(ordersData);
            }
        }
        getOrders();
    }, []);

    return (
        <div className="orders-container">
            {orders ?
                orders.map( (order, index) => (
                    <Order
                        orderData={order}
                    /> 
                ))

                :
                <p>Loading Orders...</p>
            }
            
        </div>
    );
}

export default RecentOrdersContainer;