import React, { useState, useEffect } from "react";
import {Container,Row,Col, Navbar,Nav, Form,FormControl,Button,Carousel,} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductCard from "../components/ProductCard";

function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
      const data = await res.json();
      setAllProducts(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const filteredProducts = allProducts.filter((prod) =>
    prod.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    
    <div className="home-page">
      
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">VERZAA</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
              <Nav.Link as={Link} to="/products">Products</Nav.Link>
              <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
            </Nav>
            <Form className="d-flex mx-auto" style={{ maxWidth: "400px", width: "100%" }}>
              <FormControl
                type="search"
                placeholder="Search products"
                className="me-2"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </Form>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart">🛒</Nav.Link>
              <Button
                variant="outline-light"
                className="ms-2"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
              >
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Carousel fade interval={3000} className="mb-4">
        <Carousel.Item>
          <div
            style={{
              backgroundColor: "#343a40",
              height: "200px",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          ></div>
          <Carousel.Caption>
            <h3 style={{ color: "white", textShadow: "2px 2px 4px #000" }}>
              Big Summer Sale
            </h3>
            <p style={{ color: "white", textShadow: "2px 2px 4px #000" }}>
              Up to 50% off on electronics
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className="d-block w-100"
            style={{
              backgroundImage: `url(https://source.unsplash.com/1200x400/?gadgets,sale)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "200px",
            }}
          />
          <Carousel.Caption>
            <h3 style={{ color: "white", textShadow: "2px 2px 4px #000" }}>
              New Gadgets Arrived
            </h3>
            <p style={{ color: "white", textShadow: "2px 2px 4px #000" }}>
              Check out our latest collection
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container>
        <h2 className="text-center mb-4">Popular Products</h2>
        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center">No products found.</p>
        ) : (
          <Row>
            {filteredProducts.map((prod) => (
              <Col key={prod._id} sm={12} md={6} lg={3} className="mb-4">
                <ProductCard product={prod} />
              </Col>
            ))}
          </Row>
        )}
      </Container>

      <footer className="footer mt-5 text-white text-center p-3 bg-dark">
        <p>&copy; 2025 MyShop. All rights reserved.</p>
        <div>
          <Link to="/about" className="text-white me-3">About</Link>
          <Link to="/contact" className="text-white me-3">Contact</Link>
          <Link to="/terms" className="text-white">Terms & Conditions</Link>
        </div>
      </footer>
    </div>
  );
}

export default Home;


