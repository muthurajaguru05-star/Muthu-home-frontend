import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Website css/Order.css";

function Myorders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const username = localStorage.getItem("username");
    axios
      .get(`http://localhost:5001/api/orders/user/${username}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  },[]);

  return (

    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-right order-width">

          <h1>My Orders</h1>

          <table className="order-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Products</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>

              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>
                      {order.items.map((item, i) => (
                        <div key={i}>
                          <img
                            src={item.image}
                            alt=""
                            className="order-image"
                          />
                          <p>{item.title}</p>
                          <p>Qty : {item.qty}</p>
                          <hr />
                        </div>
                      ))}
                    </td>
                    <td>₹{order.totalAmount}</td>
                    <td>{order.paymentMethod}</td>
                    <td>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ): (
                <tr>
                  <td colSpan="5">No Orders Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Myorders;