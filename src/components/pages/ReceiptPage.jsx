import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';

function ReceiptPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const orderData = location.state; 

    if (!orderData) {
      return (
        <div>
          <h1>Warning</h1>
          <p>You must have made an order to see this page.</p>
          <button className="cta"onClick={() => navigate('/order')}>Go to Order Page</button>
        </div>
      );
    }

    const { delivery_address: address, pizza_size: size, total_price: totalPrice, order_user: userThatOrdered, 
        name, quantity, toppings 
    } = orderData;
  
    return (
      <div className="mushroom-bg receipt">
        <h1>Order Receipt</h1>
        <p><strong>Order for:</strong> {name}</p>
        <p><strong>Deliver to:</strong> {address}</p>
        <p><strong>Size:</strong> {size}</p>
        <p><strong>Toppings:</strong> { toppings ? toppings.join(', ') : "no toppings"}</p>
        <p><strong>Quantity:</strong> {quantity}</p>
        <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
        { userThatOrdered && <p><strong>Ordered by:</strong> {userThatOrdered}</p>}
        <button className="cta"onClick={() => navigate('/')}>Back To Home Page</button>
      </div>
    );
  }
  
  export default ReceiptPage;