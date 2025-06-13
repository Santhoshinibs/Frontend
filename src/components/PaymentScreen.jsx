import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/PaymentScreen.css';
import BackToHome from './BackToHome';
function PaymentScreen() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('paymentMethod', paymentMethod);
    navigate('/place-order');
  };

  return (
    <Container className='payment-container'>
      <BackToHome/>
      <h2>Payment Method</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Check
          type="radio"
          label="PayPal"
          value="PayPal"
          checked={paymentMethod === 'PayPal'}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <Form.Check
          type="radio"
          label="Credit Card"
          value="Credit Card"
          checked={paymentMethod === 'Credit Card'}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
         <Form.Check
          type="radio"
          label="Cash on Delivery"
          value="Cash on Delivery"
          checked={paymentMethod === 'Cash on Delivery'}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <Button type="submit" className="mt-3">Continue</Button>
      </Form>
    </Container>
  );
}

export default PaymentScreen;
