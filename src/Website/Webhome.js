import { useEffect, useState } from "react";
import Swal from "sweetalert2"; 
import axios from "axios";
import "../Website css/Webhome.css";
import { Link, useNavigate } from "react-router-dom";
import homedhoni from "../Website jpg/homebannerdhoni2.jpg";
import homeiyer from "../Website jpg/iyerhomebanner.jpg";
import homenbannerdhoni from "../Website jpg/dhonihomebanner.jpg";
import { FaShoppingCart } from "react-icons/fa";
import Lastnavebar from "./Lastnavebar";
import apple from "../Website jpg/homevivopg.jpg"
import washing from "../Website jpg/homewashing1.jpg"
import ac from "../Website jpg/ac.jpg"
import led from "../Website jpg/hometv.png"
import Navebarhome from "./Navebarhome";
import day from "../Website jpg/daypg.jpg";
import night from "../Website jpg/nightpg.jpg"
import { useRef } from "react";
// import Hero from "./Hero";

function Webhome() {
const [bgImage, setBgImage] = useState(day);
  const [getcat, setgetcat] = useState([]);
  const [product, setproduct] = useState([]);
  const navigate = useNavigate();

      // CATEGORY API
    useEffect(() => {
    axios.get("http://localhost:5001/api/categores")
      .then((res) => {
        setgetcat(res.data);
      });
    }, []);

     // PRODUCT API
     useEffect(() => {
     axios.get("http://localhost:5001/api/products")
      .then((res) => {
        setproduct(res.data);
      });
    }, []);


  const addToCart = (item) => {

  const username = localStorage.getItem("name");

     if (!username) {
     Swal.fire({
      icon: "warning",
      title: "Login Required",
      text: "Please login first",
    });

    navigate("/login");
    return;
   }

  const cartKey = `cart_${username}`;

  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const exists = cart.find((p) => p._id === item._id);

    if (exists) {
    exists.qty += 1;
    } else {
     cart.push({
      _id: item._id,
      title: item.title,
      image: item.image,
      price: item.price,
      oldprice: item.oldprice,
      qty: 1,
    });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));

    window.dispatchEvent(new Event("cartUpdated"));

    Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Added To Cart Successfully",
    showConfirmButton: false,
    timer: 1500
   });
  };
const containerRef = useRef();

const handleWheel = (e) => {
    e.preventDefault();
    containerRef.current.scrollLeft += e.deltaY;
   };

  return (
    <>
  <div className="wholehomepage">
    


      <div>
          <div
               className="homebackgroundpgbanner"
                style={{
                backgroundImage: `url(${bgImage})`, }}>  

         <Navebarhome />
         <h2 className="home-quotebanner"    onMouseEnter={() => setBgImage(day)}
              onMouseLeave={() => setBgImage(night)}>Smart Appliances for a Smarter Home</h2>

          <p className="home-quotebanner p"   onMouseEnter={() => setBgImage(day)}
              onMouseLeave={() => setBgImage(night)}>
            Experience comfort, convenience, and innovation in every corner of your home.</p>
         <div className="homeproduct-containerbanner"  ref={containerRef}
        onWheel={handleWheel}>
       <div className="homeproduct-cardbanner"  >
      <img
      src={ac}
      alt="AC"
      className="homeproduct-imagebanner"
    />
    <h3>Smart AC</h3>
    <p>Cooling Solution</p>
    <Link to="/webproduct"   state={{ category: "Air Conditioner" }}> <button>View →</button></Link>
   
  </div>

    <div className="homeproduct-cardbanner">
    <img
      src={washing}
      alt="Washing Machine"
      className="homeproduct-imagebanner"
    />
    <h3>Washing Machine</h3>
    <p>Home Appliance</p>
    <Link to="/webproduct"   state={{ category: "WashingMachine" }}> <button>View →</button></Link>
    </div>

   <div className="homeproduct-cardbanner">
    <img
      src={apple}
      alt="Phone"
      className="homeproduct-imagebanner"
    />
    <h3>Vivo Phone</h3>
    <p>Latest Model</p>
     <Link to="/webproduct"  state={{ category: "Mobile" }}> <button>View →</button></Link>
    </div>
    <div className="homeproduct-cardbanner" >
    <img
      src={led}
      alt="Phone"
      className="homeproduct-imagebanner"
    />
    <h3>LED TV</h3>
    <p>Latest Model</p>
    <Link to="/webproduct"  state={{ category: "TV" }}> <button>View →</button></Link>
   </div>
   </div>
        </div>


        {/* CATEGORY TITLE */}
        <span className="shoptitle">
          Shop by Category
        </span>

        {/* CATEGORY SECTION */}
        <div className="webcategory">

          {getcat.map((value, index) => (
            <div key={index} className="wecategoryphoto">

              <Link
                to="/webproduct"
                state={{ category: value.name }}
                className="categorythink"
              >

                <img
                  src={value.image}
                  alt="category"
                  width="70"
                  height="70"
                  className="categoryimage"
                />

                <span className="categoryspan">
                  {value.name}
                </span>

              </Link>

            </div>
          ))}

        </div>

        {/* DHONI BANNER */}
        <div className="homedhoni-container">

          <Link to="/webproduct">
            <img
              src={homedhoni}
              alt="Dhoni Banner"
              className="homedhoni-image"
            />
          </Link>

        </div>

        {/* TITLE */}
        <span className="shoptitle2">
          Best Appliance Range
        </span>

        {/* PRODUCT GRID */}
        <div className="homeproduct-grid">

          {product
            .filter((value) => value.offer > 30)
            .slice(0, 5)
            .map((value, index) => (
              <div
                key={index}
                className="homeproduct-card"
               onClick={() =>
               navigate(`/product/${value._id}`)
                    }
              >

                <div className="homeimage-box">

                  <img src={value.image} alt={value.title} />

                  <span className="homeoffer-badge">
                    {value.offer}% OFF
                  </span>

                  <div className="homehover-icons">

                    <div
                      className="homeicon-circle"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(value);
                      }}
                    >
                      <FaShoppingCart />
                    </div>

                  </div>

                </div>

                <div className="homeproduct-info">

                  <h3>{value.title}</h3>
                  <p>{value.category}</p>

                  <div className="homeprice-box">
                    <span className="homeprice">₹{value.price}</span>
                    <span className="homeoldprice">₹{value.oldprice}</span>
                  </div>

                </div>

              </div>
            ))}

          {/* BANNER */}
          <div className="home-banner3">
            <img className="banner-img1" src={homeiyer} alt="" />
            <img className="banner-img3" src={homenbannerdhoni} alt="" />
          </div>

          {/* MORE PRODUCTS */}
          {product
            .filter((value) => value.offer > 40)
            .slice(0, 5)
            .map((value, index) => (
              <div
                key={index + 10}
                className="homeproduct-card"
                 onClick={() =>
                  navigate(`/product/${value._id}`)
                }
              >

                <div className="homeimage-box">

                  <img src={value.image} alt={value.title} />

                  <span className="homeoffer-badge">
                    {value.offer}% OFF
                  </span>

                  <div className="homehover-icons">

                    <div
                      className="homeicon-circle"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(value);
                      }}
                    >
                      <FaShoppingCart />
                    </div>

                  </div>

                </div>

                <div className="homeproduct-info">

                  <h3>{value.title}</h3>
                  <p>{value.category}</p>

                  <div className="homeprice-box">
                    <span className="homeprice">₹{value.price}</span>
                    <span className="homeoldprice">₹{value.oldprice}</span>
                  </div>

                </div>

              </div>
            ))}

        </div>
      </div>

      <Lastnavebar />
      </div>

    </>
  );
}

export default Webhome;