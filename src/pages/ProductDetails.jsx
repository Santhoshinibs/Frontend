import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Button, Card, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { useCart } from "../context/CartContext";
import NavbarComponent from "../components/NavbarComponent";
import BackToHome from '../components/BackToHome';
export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [ratings, setRatings] = useState("");
  const [comments, setComments] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
      setProduct(data);
    } catch {
      setError("Failed to load product");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id, message]);

  const submitReview = async e => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    if (!token) return setError("Please login to add a review");

    try {
      await axios.post(
         `${import.meta.env.VITE_API_URL}/api/products/${id}/reviews`,
        { ratings, comments },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Review submitted!");
      setRatings("");
      setComments("");
      setError("");
    } catch (er) {
      setError(er.response?.data?.message || "Submit failed");
    }
  };

  if (error && !product) return <div className="p-3 text-danger">{error}</div>;
  if (!product) return <div className="p-3">Loading...</div>;

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  return (
    <Container className="mt-3">
      <BackToHome/>
      <NavbarComponent />
      <Row>
        <Col md={6}>
          <Image src={product.image} fluid alt={product.name} />
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h4>₹{product.price}</h4>
          <Button onClick={() => addToCart(product)}>Add to Cart</Button>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Reviews</Card.Title>
              {product.reviews.length === 0 ? (
                <p>No reviews yet.</p>
              ) : (
                product.reviews.map(r => (
                  <div key={r._id}>
                    <strong>{r.userName}</strong>
                    <p>Rating: {r.ratings}⭐</p>
                    <p>{r.comments}</p>
                    <hr />
                  </div>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Write a Review</Card.Title>
              {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              {token ? (
                <Form onSubmit={submitReview}>
                  <Form.Group>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control as="select" value={ratings} onChange={e => setRatings(e.target.value)}>
                      <option value="">Select...</option>
                      {[1,2,3,4,5].map(v => <option key={v} value={v}>{v}</option>)}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as="textarea" rows={3} value={comments} onChange={e => setComments(e.target.value)} />
                  </Form.Group>
                  <Button type="submit" className="mt-3">Submit</Button>
                </Form>
              ) : (
                <p>Please login to add a review.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

