import React from 'react';
import '../styles/Terms.css';
import BackToHome from '../components/BackToHome';
function Terms() {
  return (
    <div className="terms-container">
      <BackToHome/>
      <h1>Terms & Conditions</h1>
      <p className="last-updated">Last updated: May 16, 2025</p>

      <section>
        <h4>1. Introduction</h4>
        <p>
          By accessing or using our website, you agree to be bound by these terms. Please
          read them carefully before using our services.
        </p>
      </section>

      <section>
        <h4>2. Use of Website</h4>
        <p>
          You must be at least 18 years old to access this website. You agree not to misuse
          the features, services, or content offered.
        </p>
      </section>

      <section>
        <h4>3. Products and Services</h4>
        <p>
          Product details, availability, and prices may change without notice. We reserve the
          right to discontinue any product at any time.
        </p>
      </section>

      <section>
        <h4>4. Payments and Refunds</h4>
        <p>
          All transactions are processed securely. Refunds are subject to our Return & Refund Policy.
        </p>
      </section>

      <section>
        <h4>5. Intellectual Property</h4>
        <p>
          All content, trademarks, and intellectual property belong to <strong>Your Company</strong>. 
          Unauthorized use is strictly prohibited.
        </p>
      </section>

      <section>
        <h4>6. Limitation of Liability</h4>
        <p>
          We are not liable for any direct, indirect, or incidental damages from the use or
          inability to use our website or products.
        </p>
      </section>

      <section>
        <h4>7. Changes to Terms</h4>
        <p>
          We reserve the right to modify these terms at any time. Continued use of the website
          after changes implies acceptance.
        </p>
      </section>

      <section>
        <h4>8. Contact Us</h4>
        <p>
          For questions, reach us at <a href="mailto:support@example.com">santhoshini@gmail.com</a>.
        </p>
      </section>
    </div>
  );
}

export default Terms;

