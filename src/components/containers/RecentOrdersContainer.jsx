import React, { useEffect, useState } from "react";
import { fetchOrdersPaginated } from "../../helpers";

function RecentOrdersContainer({ user }) {

    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);

    const ordersPerPage = 5;

    const offset = (currentPage - 1) * ordersPerPage;
    useEffect( () => {
        if (!user?.email) return;

        async function getOrders() {
            const ordersData = await fetchOrdersPaginated({
                userEmail: user.email,
                limit: ordersPerPage,
                offset
            });

            if(ordersData) {
                setOrders(ordersData.orders);
                setTotalOrders(ordersData.totalCount);
            }
        }
        getOrders();
    }, [user?.email, currentPage])

    const totalPages = Math.ceil(totalOrders / ordersPerPage);

    return (
        <section>
            <h3>Your recent orders:</h3>
            <table>
                <thead>
                    <tr>
                    <th>Date</th>
                    <th>For</th>
                    <th>Delivery Address</th>
                    <th>Size</th>
                    <th>Toppings</th>
                    <th>Qty.</th>
                    <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orders ?

                        orders.map( (order, index) => {
                            const dateCreated = new Date(order.created_at);
                            const {name, delivery_address, pizza_size, toppings, quantity, total_price} = order;
                            return(
                                <tr key={index}>
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
            <div className="btn-container">
                <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="liked"
                >
                    Previous
                </button>

                <span> Page {currentPage} of {totalPages} </span>

                <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="liked"
                >
                    Next
                </button>
            </div>
        </section>
    );
}

export default RecentOrdersContainer;