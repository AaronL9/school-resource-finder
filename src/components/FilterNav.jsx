import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

function FilterNav() {
  const [activeItem, setActiveItem] = useState(0);

  const items = [
    { label: "All", color: "orange" },
    { label: "Popular", color: "green" },
    { label: "Web", color: "blue" },
    { label: "System", color: "red" },
    { label: "Animation", color: "rebeccapurple" },
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
