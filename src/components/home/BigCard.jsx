import React from 'react'

export default function BigCard() {
  return (
    <>
      <a href="#" className="card-item">
        <img src="/images/notes.jpg" alt="Card Image" />
        <span className="developer">Developer</span>
        <h3>A "developer" codes software and websites.</h3>
        <div className="arrow">
          <i className="fas fa-arrow-right card-icon" />
        </div>
      </a>
    </>
  );
}
