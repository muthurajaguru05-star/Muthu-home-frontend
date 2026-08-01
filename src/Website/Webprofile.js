import React, { useEffect, useState } from "react";
import axios from "axios";
// import Swal from "sweetalert2";
import "../Website css/Webprofile.css";
import hardik from "../Website jpg/hardik.jpg";
import { useNavigate } from "react-router-dom";

function Webprofile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (!email) return;

       axios
      .get(`http://localhost:5001/api/profile/${email}`)
      .then((res) => {
        setUser(res.data);
        setFormData(res.data);
      })
      .catch((err) => console.log(err));
     }, []);
     if (!user) {
      return (
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    );
    }

    return (
        <div className="profile-page">
        <div className="profile-card">

         <div className="profile-left">
          <div className="profile-image">
            <img src={hardik} alt="profile" />
          </div>

          <h2>{user.name}</h2>
          <p>{user.role}</p>
          <button
         className="order-btnprofile"
         onClick={() => {
         localStorage.setItem("username", user.name);
         navigate("/myorders");
          }}>
            My Orders
          </button>
          </div>
        

         <div className="profile-right">
          <h1>Profile</h1>

          <div className="info-box">
            <label>User Name</label>
            <input
              name="name"
              value={formData.name || ""}
              // onChange={handleChange}
            />
          </div>

           <div className="info-box">
            <label>Email</label>
            <input value={formData.email || ""} readOnly />
           </div>

          <div className="info-box">
            <label>Contact</label>
            <input
              name="contact"
              value={formData.contact || ""}
              // onChange={handleChange}
            />
          </div>

            <div className="info-box">
            <label>Role</label>
            <input
              name="role"
              value={formData.role || ""}
              // onChange={handleChange}
            />
           </div>

          {/* <button className="save-btn" onClick={handleSave}>
            Save Profile
          </button> */}
        </div>

      </div>
    </div>
  );
}

export default Webprofile;