import React, { useState } from 'react';
import '../styles/Contact.css';
import BackToHome from '../components/BackToHome';
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-container">
      <BackToHome/>
      <h1>Contact Us</h1>
      <p className="contact-subtext">
        Have questions or feedback? We’d love to hear from you!
      </p>
      <form onSubmit={handleSubmit} className="contact-form shadow">
        <div className="form-group mb-3">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            className="form-control"
            name="message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            placeholder="Type your message here..."
            required
          ></textarea>
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;

