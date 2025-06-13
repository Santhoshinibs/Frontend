import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/ShippingScreen.css';
import BackToHome from './BackToHome';

function ShippingScreen() {
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    mobile: '',
    country:''
  });

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save entire shipping address
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
    navigate('/payment');
  };

  return (
    <Container className='shipping-container'>
      <BackToHome/>
      <h2>Shipping Address</h2>
      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="fullName" className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            placeholder="Enter full name"
            value={shippingAddress.fullName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="address" className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            placeholder="Enter address"
            value={shippingAddress.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="city" className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            placeholder="Enter city"
            value={shippingAddress.city}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="state" className="mb-3">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            name="state"
            placeholder="Enter state"
            value={shippingAddress.state}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="postalCode" className="mb-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            name="postalCode"
            placeholder="Enter postal code"
            value={shippingAddress.postalCode}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="mobile" className="mb-3">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            name="mobile"
            placeholder="Enter mobile number"
            value={shippingAddress.mobile}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="country">
  <Form.Label>Country</Form.Label>
  <Form.Control
    type="text"
    placeholder="Enter country"
    value={shippingAddress.country}
    onChange={(e) =>
      setShippingAddress({ ...shippingAddress, country: e.target.value })
    }
    required
  />
</Form.Group>

        <Button type="submit" className="mt-3">Continue</Button>
      </Form>
      
    </Container>
  );
}

export default ShippingScreen;
