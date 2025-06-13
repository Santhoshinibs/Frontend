import React from 'react';
import '../styles/About.css';
import BackToHome from '../components/BackToHome';


function About() {
  return (
    <div className="about-container">
      <BackToHome/>
      <h1>About Us</h1>
      <p>
        Welcome to our E-Commerce Platform! We're committed to delivering top-quality
        products with a seamless shopping experience.
      </p>

      <div className="about-highlight">
        <strong>Our Mission:</strong> To provide a smooth, secure, and satisfying shopping
        experience powered by modern web technologies.
      </div>

      <p>
        Built using the powerful MERN stack (MongoDB, Express, React, Node.js), our
        platform ensures performance, scalability, and robust security.
      </p>

      <p>
        Whether you're shopping for electronics, clothing, or accessories — we've got you
        covered. Thank you for choosing us!
      </p>

      <p>
        For support or feedback, feel free to contact our team anytime.
      </p>

    </div>
  );
}

export default About;

