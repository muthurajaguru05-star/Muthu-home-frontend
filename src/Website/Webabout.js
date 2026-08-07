import Navebar from "./Navebar";
import "../Website css/Webabout.css";

import aboutac from "../Website jpg/aboutac.jpg";
import applephone from "../Website jpg/applephone.jpg";
import abouttv from "../Website jpg/abouttv.jpg";
import FooterNavbar from "./FooterNavbar";
import { useNavigate } from "react-router-dom";

function Webabout() {
  const navigate = useNavigate();

  return (
    <>
      <Navebar />

      <div className="main-container">

        {/* ABOUT TITLE */}
        <div className="about-box animate">
          <span className="about-title">ABOUT US</span>
        </div>

        {/* AC SECTION */}
        <div
          className="ac-section animate delay-1"
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate("/webproduct", {
              state: { category: "Air Conditioner" },
            })
          }
        >
          <img src={aboutac} alt="AC" className="about-image" />

          <h2 className="about-heading">
            Why Choose Our AC Service?
          </h2>

          <p className="about-text">
            Welcome to our AC Service Center. We provide professional air
            conditioner installation, repair, and maintenance services for
            homes and offices. Our experienced technicians are dedicated to
            delivering fast, reliable, and affordable solutions.
          </p>
        </div>

        {/* IPHONE SECTION */}
        <div
          className="iphone-container animate delay-2"
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate("/webproduct", {
              state: { category: "Mobile" },
            })
          }
        >
          <div className="iphone-image-section">
            <img src={applephone} alt="iPhone" className="iphone-image" />
          </div>

          <div className="iphone-text-section">
            <h2 className="about-iphone">
              Discover the Innovation of Apple iPhone
            </h2>

            <p className="about-iphonetext">
              Apple iPhone is one of the world's most advanced smartphones
              with powerful performance, premium design, and strong security.
            </p>
          </div>
        </div>

        {/* TV SECTION */}
        <div
          className="tv-container animate delay-3"
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate("/webproduct", {
              state: { category: "TV" },
            })
          }
        >
          <div className="tv-text-section">
            <h2 className="tv-heading">
              Experience Stunning Clarity with Full HD LED TV
            </h2>

            <p className="tv-text">
              Full HD LED TV delivers crystal-clear picture quality with
              vibrant colors and immersive viewing experience.
            </p>
          </div>

          <div className="tv-image-section">
            <img src={abouttv} alt="TV" className="tv-image" />
          </div>
        </div>

      </div>

      <FooterNavbar />
    </>
  );
}

export default Webabout;