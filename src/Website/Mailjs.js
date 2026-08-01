import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const Mailjs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault(); // Prevents page reload

    emailjs
      .sendForm(
        'service_v9dt7kf', 
        'template_urjfa26', 
        form.current, 
        { publicKey: '6Ars6X_lL0gKl8bWA' }
      )
      .then(
        () => {
          alert('Email sent successfully!');
          form.current.reset(); // Clears form inputs
        },
        (error) => {
          console.error('Failed to send email:', error.text);
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" required />
      
      <label>Email</label>
      <input type="email" name="user_email" required />
      
      <label>Message</label>
      <textarea name="message" required />
      
      <input type="submit" value="Send" />
    </form>
  );
};