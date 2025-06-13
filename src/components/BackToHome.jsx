import React from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import "../styles/BackToHome.css"; 

function BackToHome() {
  const navigate = useNavigate();

  return (
    <div
      className="back-home-wrapper"
      onClick={() => navigate("/home")}
    >
      <BsArrowLeft className="back-arrow" />
      <span className="back-text">Back to Home</span>
    </div>
  );
}

export default BackToHome;


