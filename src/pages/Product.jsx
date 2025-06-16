import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import "../styles/Product.css";
import BackToHome from '../components/BackToHome';

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios.get(`${import.meta.env.VITE_API_URL}/api/products`)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
        setError("Failed to fetch products");
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading products...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div className="products-container">
      <BackToHome />
      <h1>Product Catalog</h1>
      <div className="products-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <img
              src={
                product.image.startsWith("http")
                  ? product.image
                  : `${import.meta.env.VITE_API_URL}/api/products/${product.image}`
              }
              alt={product.name}
            />
            <div className="card-body">
              <Link to={`/product/${product._id}`} className="product-title-link">
                {product.name}
              </Link>
              <p className="price">₹{product.price}</p>
              <button
                className="btn-buy"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;

