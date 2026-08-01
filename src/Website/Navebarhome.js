import { Link } from "react-router-dom";
import elc from "../Website jpg/elec.jpg";
import "../Website css/Navebarhome.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function Navebarhome() {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [userName, setUserName] = useState("");
  

  // CART UPDATE (USER WISE)
  const updateCart = () => {
    const username = localStorage.getItem("username");

    if (!username) {
      setCartItems([]);
      setCartCount(0);
      return;
    }

    const cartKey = `cart_${username}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    setCartItems(cart);

    const totalQty = cart.reduce(
      (sum, item) => sum + (Number(item.qty) || 0),
      0
    );

    setCartCount(totalQty);
  };

  useEffect(() => {
  updateCart();

  const name = localStorage.getItem("name");
  setUserName(name || "");

  window.addEventListener("cartUpdated", updateCart);

  return () => {
    window.removeEventListener("cartUpdated", updateCart);
  };
}, []);

 const handleLogout = () => {
  Swal.fire({
    title: "Logout?",
    text: "Do you really want to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, Logout",
  }).then((result) => {
    if (result.isConfirmed) {

      localStorage.removeItem("email");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      localStorage.removeItem("contact");

      setUserName("");
      setCartItems([]);
      setCartCount(0);

      Swal.fire({
        title: "Logged out!",
        text: "You have been logged out successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    }
  });
};

  return (
    <div className="navbarhome">

      <Link to="/webhome">
        <img src={elc} className="logo" alt="logo" />
      </Link>

      <Link to="/webhome" className="navelink">HOME</Link>
      <Link to="/about" className="navelink">ABOUT</Link>
      <Link to="/webproduct" className="navelink">PRODUCT</Link>
       <Link to="/contact" className="navelink">
        CONTACT
      </Link>


      <div className="homeicons">

        {userName ? (
          <div className="user-info">

            {/* <i className="fa-solid fa-circle-user"></i>

            <span className="user-email">
              {userEmail}
            </span> */}
              <i className="fa-solid fa-circle-user"></i>
                 <Link to="/webprofile" className="loginlink">
                
                <span>{userName}</span>
                </Link>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>
        ) : (
          <Link to="/login" className="loginlink">
            <i className="fa-solid fa-circle-user"></i>
            <span>Login</span>
          </Link>
        )}

      </div>

      {/* CART */}
      <div
        className="cart-wrapper"
        onMouseEnter={() => setShowCart(true)}
        onMouseLeave={() => setShowCart(false)}
      >

        <Link to="/cart" className="homecart-icon">
          <i className="fa-solid fa-cart-shopping"></i>

          <span className="cart-count">
            {cartCount}
          </span>
        </Link>

        {showCart && (
          <div className="cart-dropdown">

            <h4>Cart Items</h4>

            {cartItems.length === 0 ? (
              <p className="empty-cart">Cart Empty</p>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className="cart-item">

                  <img src={item.image} alt={item.title} />

                  <div className="cart-details">
                    <p>{item.title}</p>
                    <span>₹{item.price}</span>
                    <small>Qty: {item.qty}</small>
                  </div>

                </div>
              ))
            )}

            <Link to="/cart" className="view-cart-btn">
              VIEW CART
            </Link>

          </div>
        )}

      </div>

    </div>
  );
}

export default Navebarhome;