import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BackToHome from './BackToHome';
import {Container,Card,ListGroup,Row,Col,Image,} from 'react-bootstrap';

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const safeToFixed = (num) => (typeof num === 'number' ? num.toFixed(2) : '0.00');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) return <Container><p>Loading order...</p></Container>;

  return (
    <Container className="my-4">
      <BackToHome/>
      <h2>Order Details</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>Shipping</h4>
              <p><strong>Name:</strong> {order.user?.name || 'N/A'}</p>
              <p><strong>Email:</strong> <a href={`mailto:${order.user?.email}`}>{order.user?.email}</a></p>
              <p>
                <strong>Address:</strong> {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>Payment Method</h4>
              <p>{order.paymentMethod}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>Order Items</h4>
              {order.orderItems?.length === 0 ? (
                <p>No items in this order</p>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className="align-items-center">
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>{item.name}</Col>
                        <Col>
                          {item.qty} x ₹{item.price} = ₹{safeToFixed(item.qty * item.price)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>Order Summary</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>₹{safeToFixed(order.itemsPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>₹{safeToFixed(order.shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col><strong>₹{safeToFixed(order.totalPrice)}</strong></Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default OrderDetails;



