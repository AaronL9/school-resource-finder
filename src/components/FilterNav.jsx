import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

function FilterNav() {
  const [activeItem, setActiveItem] = useState(0);

  const items = [
    { label: "Home", color: "orange" },
    { label: "About", color: "green" },
    { label: "Testimonials", color: "blue" },
    { label: "Blog", color: "red" },
    { label: "Contact", color: "rebeccapurple" },
  ];

  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  const indicatorStyle = {
    backgroundColor: items[activeItem].color,
  };

  return (
    <div className="filter-nav">
      {items.map((item, index) => (
        <Link
          key={index}
          href="#"
          className={`nav-item ${activeItem === index ? "is-active" : ""}`}
          style={{ color: activeItem === index ? item.color : "#83818c" }}
          active-color={item.color}
          onClick={() => handleItemClick(index)}
        >
          {item.label}
        </Link>
      ))}
      <span className="nav-indicator" style={indicatorStyle}></span>
    </div>
  );
}

export default FilterNav;
