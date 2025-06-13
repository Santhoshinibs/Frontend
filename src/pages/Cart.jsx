import React from "react";
import { Container, Row, Col, Button, ListGroup, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";
import BackToHome from '../components/BackToHome';

function Cart() {
  const { cartItems, addToCart, removeFromCart, decreaseQuantity } = useCart();
  const navigate = useNavigate();

  const increaseQty = (id) => {
    const item = cartItems.find((item) => item._id === id);
    if (item) addToCart(item);
  };

  const decreaseQty = (id) => {
    decreaseQuantity(id);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Container className="mt-4">
      <BackToHome/>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/products">Go shopping</Link>
        </p>
      ) : (
        <>
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row className="align-items-center">
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={4}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>₹{item.price.toFixed(2)}</Col>
                  <Col md={2}>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => decreaseQty(item._id)}
                      disabled={item.quantity === 1}
                      className="me-2"
                    >
                      -
                    </Button>
                    {item.quantity}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => increaseQty(item._id)}
                      className="ms-2"
                    >
                      +
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <hr />
          <h4>Total: ₹{totalPrice.toFixed(2)}</h4>
          <Button
            variant="success"
            onClick={() => navigate("/shipping")}
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </Button>
        </>
      )}
    </Container>
  );
}

export default Cart;

