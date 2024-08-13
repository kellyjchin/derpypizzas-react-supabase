import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';

function Order({ orderData }) {

    // TODO MAYBE MAKE EACH ORDER AN ACCORDION
    const { delivery_address: address, pizza_size: size, total_price: totalPrice, order_user: userThatOrdered, created_at: orderDate,
        name, quantity, toppings 
    } = orderData;
    
    let orderDateConverted = new Date(orderDate);

    return (
      <div className="mushroom-bg receipt">
        <p><strong>Ordered at:</strong> { orderDateConverted.toLocaleString() }</p>
        <p><strong>Order for:</strong> {name}</p>
        <p><strong>Deliver to:</strong> {address}</p>
        <p><strong>Size:</strong> {size}</p>
        <p><strong>Toppings:</strong> { toppings ? toppings.join(', ') : "no toppings"}</p>
        <p><strong>Quantity:</strong> {quantity}</p>
        <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
        { userThatOrdered && <p><strong>Ordered by:</strong> {userThatOrdered}</p>}
      </div>
    );
  }
  
  export default Order;