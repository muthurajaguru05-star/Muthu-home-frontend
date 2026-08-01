import React, { useEffect, useState } from "react";
import "../Website css/Webregister.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function LoginForm() {
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/registers")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);

        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Unable to load users",
        });
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (item) =>
        item.email === formData.email &&
        item.password === formData.password
    );

    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid Email or Password",
      });
      return;
    }

    localStorage.setItem("email", user.email);
    localStorage.setItem("role", user.role);
    localStorage.setItem("name", user.name);
    localStorage.setItem("contact", user.contact);

    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: `Welcome ${user.name}`,
      timer: 1500,
      showConfirmButton: false,
    });

    setTimeout(() => {
      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/webhome");
      }
    }, 1500);
  };

  return (
    <div className="wholelogin">
      <div className="login-container">

        {/* LEFT SIDE */}
        <div className="login-left">
          <h1>WELCOME</h1>
          <h3>YOUR HEADLINE NAME</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Accusantium ipsa cumque dolorem.
          </p>

          <div className="circle1"></div>
          <div className="circle2"></div>
          <div className="circle3"></div>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-right">
          <form className="login-form" onSubmit={handleLogin}>
            <h2>LOGIN</h2>

            <div className="input-box">
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

                 <div className="password-wrapper">
               <input
               type={showPassword ? "text" : "password"}
               name="password"
               placeholder="Password"
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

            <div className="options">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
            </div>

            <button className="webloginbtn" type="submit">
              Sign In
            </button>

            <p className="signup-text">
              Don't have an account?
              <Link to="/register"> Sign Up</Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}