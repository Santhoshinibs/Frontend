import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, ListGroup, Button, Card } from 'react-bootstrap';
import '../styles/PlaceOrder.css';
import BackToHome from '../components/BackToHome';

function PlaceOrder() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

 const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));

  
  const paymentMethod = localStorage.getItem('paymentMethod');
  const user = JSON.parse(localStorage.getItem('user'));
  

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingPrice = itemsPrice > 1000 ? 0 : 100;
  const totalPrice = itemsPrice + shippingPrice;

  const handlePlaceOrder = async () => {
  const orderItems = cartItems.map(item => ({
    name: item.name,
    qty: item.quantity,
    image: item.image,
    price: item.price,
    product: item._id,
  }));

  // ⛔️ Check if user is null or token is missing
  if (!user || !user.token) {
    alert('Please login to place an order');
    navigate('/login');
    return;
  }

  try {
    const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/orders`,
      {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    clearCart();
    navigate(`/order/${data._id}`);
  } catch (error) {
    console.error('Failed to place order:', error.response?.data?.message || error.message);
  }
};

 return (
  <Container className="place-order-container">
    <BackToHome/>
    <h2 className="text-center mb-4">Place Order</h2>

    <div className="row">
      {/* Left: Shipping, Payment, and Items */}
      <div className="col-md-8">
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h5>Shipping Address</h5>
            <p>{shippingAddress?.address}</p>
          </ListGroup.Item>

          <ListGroup.Item>
            <h5>Payment Method</h5>
            <p>{paymentMethod}</p>
          </ListGroup.Item>

          <ListGroup.Item>
            <h5>Order Items</h5>
            {cartItems.length === 0 ? (
              <p className="text-danger">Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <p key={item._id}>
                  {item.name} × {item.quantity} = ₹{item.price * item.quantity}
                </p>
              ))
            )}
          </ListGroup.Item>
        </ListGroup>
      </div>

      {/* Right: Order Summary */}
      <div className="col-md-4">
        <Card className="place-order-summary">
          <Card.Body>
            <h5>Order Summary</h5>
            <p>Items: ₹{itemsPrice.toFixed(2)}</p>
            <p>Shipping: ₹{shippingPrice.toFixed(2)}</p>
            <p><strong>Total: ₹{totalPrice.toFixed(2)}</strong></p>
            <Button onClick={handlePlaceOrder} disabled={cartItems.length === 0}>
              Place Order
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  </Container>
);
}
export default PlaceOrder


