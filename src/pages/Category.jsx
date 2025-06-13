import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../styles/Categories.css';
import BackToHome from '../components/BackToHome';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="mt-4">
      <BackToHome/>
      <h2 className="mb-4 text-center">Product Categories</h2>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row>
          {categories.map((cat) => (
            <Col key={cat} sm={12} md={6} lg={4} className="mb-4">
              <Card className="text-center p-4">
                <Link
                  to={`/category/${cat}`}
                  style={{ textDecoration: "none", color: "#007bff" }}
                >
                  <h4 style={{ textTransform: "capitalize" }}>{cat}</h4>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Categories;

