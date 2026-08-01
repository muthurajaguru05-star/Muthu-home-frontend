import React, { useState } from "react";
import axios from "axios";
import "../Website css/Webcontact.css";
import Swal from "sweetalert2";
import Navebarhome from "./Navebarhome";


const Webcontact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
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
    const res = await axios.post(
      "http://localhost:5001/api/contact/create",
      formData
    );

    Swal.fire({
      icon: "success",
      title: "Message Sent Successfully!",
      text: res.data.message,
      timer: 2000,
      showConfirmButton: false,
    });

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

  } catch (error) {
    console.log(error);

    Swal.fire({
      icon: "error",
      title: "Failed!",
      text: "Message not sent",
    });
  }
};
  return (
    <> <div className="wholecontactpage">
    <Navebarhome />

    
    <section className="contact-section">
       
      <div className="contact-container">

        {/* LEFT SIDE */}
        <div className="contact-info">
          <h1>Let's Connect</h1>

          <p>
            Have a project in mind? Feel free to contact us and we'll get back
            to you as soon as possible.
          </p>

          <div className="info-box">
            <span>📧</span>
            <p>muthurajaguru05@gmail.com</p>
          </div>

          <div className="info-box">
            <span>📞</span>
            <p>+91 9342798071</p>
          </div>

          <div className="info-box">
            <span>📍</span>
            <p>Chennai, Tamil Nadu</p>
          </div>

          <div className="social-links">
            <a href="/">Facebook</a>
            <a href="/">Instagram</a>
            <a href="/">LinkedIn</a>
          </div>
        </div>

        {/* PARTICLES */}
        {[...Array(25)].map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
            }}
          />
        ))}

        {/* FORM */}
        <div className="contact-form">
          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <textarea
              rows="6"
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit">
              Send Message
            </button>

          </form>
        </div>

      </div>
      
    </section>
    </div>
</>

  );
};

export default Webcontact;