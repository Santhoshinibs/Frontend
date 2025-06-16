import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={
          product.image.startsWith("http")
            ? product.image
            : `${import.meta.env.VITE_API_URL}${product.image}`
        }
        onError={(e) => { e.target.src = '/fallback.jpg'; }}
        alt={product.name}
        style={{ objectFit: "cover", height: "200px" }}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>₹{product.price}</Card.Text>
        </div>
        <Button
          as={Link}
          to={`/product/${product._id}`}
          variant="primary"
          className="mt-2"
        >
          View
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;

