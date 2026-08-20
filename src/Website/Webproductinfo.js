import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navebar from "./Navebar";
import "../Website css/Webproductinfo.css";
import FooterNavbar from "./FooterNavbar";

function Webproductinfo() {
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getSingleProduct = () => {
      axios
        .get(`http://localhost:5001/api/products/${id}`)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getSingleProduct();
  }, [id]);

    // ADD TO CART
  const addToCart = (item) => {
    // Login Check
    const username = localStorage.getItem("name");

    if (!username) {
      Swal.fire({
        icon: "warning",
        title: "Please Login First",
        text: "Login to add products to cart",
        confirmButtonText: "Login",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    const cartKey = `cart_${username}`;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const exists = cart.find((p) => p._id === item._id);

    if (exists) {
      exists.qty += 1;
      cart = cart.map((p) => (p._id === item._id ? exists : p));
    } else {
      cart.push({ ...item, qty: 1 });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Added To Cart Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

     if (!product) {
     return <h2>Loading...</h2>;
     }

    return (
    <>
      <Navebar />

      <div className="product-info-page">

        <div className="product-info-container">

          {/* IMAGE */}
          <div className="productinfo-image">
            <img
              src={product.image}
              alt={product.title}
            />
          </div>

          {/* DETAILS */}
          <div className="productinfo-details">

            <h1>{product.title}</h1>

            <p className="infobrand">
              Brand Name : {product.brand}
            </p>

            <h2 className="productinfo-price">
              ₹{product.price}
            </h2>

            <h3 className="productinfo-old-price">
              ₹{product.oldprice}
            </h3>

            <p className="productinfo-offer">
              {product.offer}% OFF
            </p>

            <span>
              <h3>Description :</h3>
              {product.description}
            </span>

            <div className="infobtn">

              {/* ADD TO CART */}
              <button
                className="productinfo-cart-btn"
                onClick={() => addToCart(product)}
              >
                ADD TO CART
              </button>

              {/* BUY NOW */}
              <button
                className="productinfo-cart-btn2"
                onClick={() => {

                  // Login Check
                  const username = localStorage.getItem("name");

                  if (!username) {
                    Swal.fire({
                      icon: "warning",
                      title: "Please Login First",
                      text: "Login to continue",
                      confirmButtonText: "Login",
                    }).then(() => {
                      navigate("/login");
                    });

                    return;
                  }
                  
                  const cartKey = `cart_${username}`;
                  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
                  const exists = cart.find(
                    (p) => p._id === product._id
                  );

                  if (exists) {
                    exists.qty += 1;
                    cart = cart.map((p) =>
                      p._id === product._id ? exists : p
                    );
                  } else {
                    cart.push({ ...product, qty: 1 });
                  }

                  localStorage.setItem(cartKey, JSON.stringify(cart));
                  window.dispatchEvent(new Event("cartUpdated"));
                  navigate("/cart");
                }}>BUY NOW</button>

            </div>

          </div>

        </div>

      </div>

      <FooterNavbar />
    </>
  );
}

export default Webproductinfo;