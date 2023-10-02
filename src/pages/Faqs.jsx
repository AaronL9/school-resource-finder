import React, { useState } from "react";
import "../assets/css/faqs.css";
import { faqsData } from "../assets/js/data";
export default function Faqs() {
  const [expanded, setExpanded] = useState(null);

  const handleAccordionClick = (id) => {
    setExpanded((prevState) => (prevState === id ? null : id));
  };
  return (
    <div className="accordion-container">
      <h2>Frequently Asked Questions</h2>
      <div className="accordion">
        {faqsData.map((item) => (
          <div className="accordion-item" key={item.id}>
            <button
              id={`accordion-button-${item.id}`}
              aria-expanded={expanded === item.id ? 'true' : 'false'}
              onClick={() => handleAccordionClick(item.id)}
            >
              <span className="accordion-title">{item.question}</span>
              <span className="icon" aria-hidden="true"></span>
            </button>
            {expanded === item.id && (
              <div className="accordion-content">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
