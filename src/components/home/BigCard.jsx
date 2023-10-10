import React from 'react'

export default function BigCard({description, tags}) {
  return (
    <>
      <a href="#" className="card-item">
        <img src="/images/notes.jpg" alt="Card Image" />
        <span className="developer">{tags}</span>
        <h3>{description}</h3>
        <div className="arrow">
          <i className="fas fa-arrow-right card-icon" />
        </div>
      </a>
    </>
  );
}
