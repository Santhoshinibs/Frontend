import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Login.css'; // Import the Login styles

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, {
      email,
      password,
    });

    localStorage.setItem("user", JSON.stringify(response.data)); // ✅ Store full user object

    alert("Login successful");
    navigate("/home"); // or redirect based on logic
  } catch (err) {
    console.error(err);
    alert("Login failed. Please check your credentials.");
  }
};


  return (
    <div className="login-page">
    <Container className="login-container">
      <Card className="login-card">
        <h2>Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>
        <p className="mt-3">
          Don't have an account?{" "}
          <a href="/register" style={{ textDecoration: "none" }}>
            Create an account
          </a>
        </p>
      </Card>
     
    </Container>
     </div>
  );
}

export default Login;
