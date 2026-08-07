import { Link } from "react-router-dom";
import logo from "../Website jpg/elec.jpg";
import "../Website css/FooterNavbar.css";

function FooterNavbar() {
  return (
    <footer className="footer-navbar">
      <div className="footer-main">
        <div className="footer-brand">
          <img src={logo} alt="Smart Home" className="footer-logo" />
          <p>
            Smart appliances and modern home solutions for every lifestyle.
          </p>
          <a href="mailto:info@smarthome.com" className="footer-contact-link">
            info@smarthome.com
          </a>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/" className="footer-link">
            Home
          </Link>
          <Link to="/about" className="footer-link">
            About
          </Link>
          <Link to="/webproduct" className="footer-link">
            Products
          </Link>
          <Link to="/contact" className="footer-link">
            Contact
          </Link>
          <Link to="/login" className="footer-link">
            Login
          </Link>
        </div>

        <div className="footer-section">
          <h4>Popular Categories</h4>
          <Link
            to="/webproduct"
            state={{ category: "Air Conditioner" }}
            className="footer-link"
          >
            Air Conditioner
          </Link>
          <Link
            to="/webproduct"
            state={{ category: "WashingMachine" }}
            className="footer-link"
          >
            Washing Machine
          </Link>
          <Link to="/webproduct" state={{ category: "TV" }} className="footer-link">
            LED TV
          </Link>
          <Link to="/webproduct" state={{ category: "Mobile" }} className="footer-link">
            Mobiles
          </Link>
        </div>

        <div className="footer-section">
          <h4>Visit Us</h4>
          <p>123 Smart Street</p>
          <p>Coimbatore, Tamil Nadu</p>
          <p>+91 98765 43210</p>
        </div>
      </div>
    </footer>
  );
}

export default FooterNavbar;
