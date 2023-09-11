import React from "react";
import "../assets/css/reviewer_card.css";

export default function ReviewerCard() {
  return (
    <div className="reviewer-card">
      <div className="card-image" />
      <div className="category"> ITE-314 </div>
      <div className="heading">
        Introduction to Database System
        <div className="author">
          By <span className="name">Abi</span> 4 days ago
        </div>
      </div>
    </div>
  );
}
