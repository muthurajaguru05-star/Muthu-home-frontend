import React, { useState } from "react";
import "../Website css/Webregister.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Webregister() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      try {
      await axios.post(
        "http://localhost:5001/api/registers",
        formData
      );

       Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Account created successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      setFormData({
        name: "",
        email: "",
        contact: "",
        password: "",
        role: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error?.response?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="wholewebregister">
      <div className="registercontainer">

        {/* LEFT SIDE */}
        <div className="registerleft">
          <h1>WELCOME</h1>
          <h3>CREATE ACCOUNT</h3>
          <p>
            Register your account and start exploring our amazing platform.
          </p>

          <div className="circle1"></div>
          <div className="circle2"></div>
          <div className="circle3"></div>
        </div>

        {/* RIGHT SIDE */}
        <div className="registerright">

          <h2>Register</h2>

          <form onSubmit={handleSubmit} className="registerform">

            {/* NAME */}
            <div className="formgroup">
              <input
                className="registerinput"
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* EMAIL */}
            <div className="formgroup">
              <input
                className="registerinput"
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* CONTACT */}
            <div className="formgroup">
              <input
                className="registerinput"
                type="tel"
                name="contact"
                placeholder="Enter Contact"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="formgroup">
              <div className="passwordwrapper">
                <input
                  className="registerinput"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="showpasswordbtn"
                  onMouseDown={() => setShowPassword(true)}
                  onMouseUp={() => setShowPassword(false)}
                  onMouseLeave={() => setShowPassword(false)}
                >
                  SHOW
                </button>
              </div>
            </div>

            {/* ROLE */}
            <div className="formgroup">
              <select
                name="role"
                className="registerinput"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
              </select>
            </div>

            <button type="submit" className="webregisterbtn">
              Register
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Webregister;