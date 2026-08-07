import React, { useEffect, useState } from "react";
import Navebar from "./Navebar";
import FooterNavbar from "./FooterNavbar";
import "../Website css/Webcheckout.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Webcheckout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const cleanNumber = (value) =>
    Number(String(value).replace(/[₹,]/g, "")) || 0;

  useEffect(() => {
    const username = localStorage.getItem("name");

    if (!username) return;

    const cartKey = `cart_${username}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    setCartItems(cart);

    const total = cart.reduce((sum, item) => {
      const price = cleanNumber(item.price);
      const qty = Number(item.qty) || 1;

      return sum + price * qty;
    }, 0);

    setSubtotal(total);
  }, []);


const handleOrder = async (e) => {
  e.preventDefault();

  const form = e.target;

  // Login user name
  const username = localStorage.getItem("username");

  const orderData = {
    name: username || form[0].value,

    contact: form[1].value,
    address: form[2].value,

    items: cartItems.map((item) => ({
      title: item.title,
      price: cleanNumber(item.price),
      qty: Number(item.qty) || 1,
      image: item.image,
    })),

    totalAmount: subtotal,
    paymentMethod,
  };

  try {
    const res = await fetch("http://localhost:5001/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();

    if (res.ok) {
      Swal.fire({
        title: "Success!",
        text: `Order placed with ${paymentMethod}`,
        icon: "success",
      }).then(() => {
        const username = localStorage.getItem("name");
        localStorage.removeItem(`cart_${username}`);

        if (paymentMethod === "UPI") {
          navigate("/payment");
        } else {
          navigate("/webprofile");
        }
      });
    } else {
      Swal.fire("Error", data.error, "error");
    }
  } catch (err) {
    Swal.fire("Error", err.message, "error");
  }
};

  return (
    <>
      <Navebar />

      <div className="checkoutdiv">
        <h2>Checkout Page</h2>

        <form className="checkoutform" onSubmit={handleOrder}>
          <input
            type="text"
            placeholder="Full Name"
            className="checkname"
            required
          />

          <input
            type="text"
            placeholder="Mobile Number"
            className="checkoutnumber"
            required
          />

          <textarea
            placeholder="Address"
            className="checkoutaddress"
            required
          />

          <div className="checkout-payment">
            <h3>Payment Method</h3>

            <label>
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>

            <br />
            <br />

            <label>
              <input
                type="radio"
                name="payment"
                value="UPI"
                checked={paymentMethod === "UPI"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              UPI Payment
            </label>
          </div>

          <div className="checkout-products">
            <h3>Order Summary</h3>

            {cartItems.map((item, index) => {
              const price = cleanNumber(item.price);
              const qty = Number(item.qty) || 1;

              return (
                <div key={index} className="checkout-product">
                  <img
                    src={item.image}
                    alt={item.title}
                    width="80"
                  />

                  <div>
                    <h4>{item.title}</h4>
                    <p>Qty : {qty}</p>
                    <p>₹{(price * qty).toLocaleString()}</p>
                  </div>
                </div>
              );
            })}

            <hr />

            <span>Total : ₹{subtotal.toLocaleString()}</span>
          </div>

          <button type="submit" className="checkoutbtn">
            Place Order
          </button>
        </form>
      </div>

      <FooterNavbar />
    </>
  );
}

export default Webcheckout;