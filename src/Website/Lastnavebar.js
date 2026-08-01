import { Link } from "react-router-dom";
import elec from "../Website jpg/elec.jpg";
import "../Website css/Navebar.css";

function Lastnavebar() {
  return (
    <div className="main-footer">
      <img src={elec} alt="banner" className="hero-image" />

      <div className="content-box">
        <div className="info-section">
          <span className="footer-title">More Information</span>

          <Link to="/webhome" className="footer-link">HOME</Link>
          <Link to="/about" className="footer-link">ABOUT</Link>
          <Link to="/webproduct" className="footer-link">PRODUCTS</Link>
          <Link to="/contact" className="footer-link">CONTACT</Link>
          <Link to="/login" className="footer-link">LOGIN</Link>
        </div>

        <div className="category-section">
          <span className="footer-title">CATEGORIES</span>

          <span className="category-item">LED TV</span>
          <span className="category-item">Air Conditioner</span>
          <span className="category-item">Washing Machine</span>
          <span className="category-item">Mobiles</span>
        </div>
      </div>
    </div>
  );
}

export default Lastnavebar;