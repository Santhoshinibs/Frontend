// 1. Import React, hooks, bootstrap, Link, and useParams from react-router-dom
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import '../styles/Categories.css';
import BackToHome from '../components/BackToHome';

// 2. Define CategoryProducts component
function CategoryProducts() {
  // 3. Get category param from URL
  const { category } = useParams();

  // 4. State for products and loading
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 5. Fetch products by category on mount and whenever category changes
  useEffect(() => {
    setLoading(true); // reset loading state on category change

    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, [category]);

 
  return (
    <Container className="mt-4">
      <BackToHome/>
      <h2 className="mb-4 text-center">
        Products in {category.charAt(0).toUpperCase() + category.slice(1)}
      </h2>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : products.length === 0 ? (
        <p className="text-center">No products found in this category.</p>
      ) : (
        <Row>
          {products.map((prod) => (
            <Col key={prod.id} sm={12} md={6} lg={3} className="mb-4">
              <Card className="h-100 product-card">
                <Card.Img
                  variant="top"
                  src={prod.image}
                  alt={prod.title}
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{prod.title}</Card.Title>
                  <Card.Text>₹{prod.price}</Card.Text>
                  <Button variant="success" className="mt-auto">
                    Buy Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}


export default CategoryProducts;
