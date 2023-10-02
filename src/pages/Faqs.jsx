import React from "react";
import "../assets/css/faqs.css";
import { faqsData } from "../assets/js/data";
import Question from "../components/faqs/Question";
export default function Faqs() {
  return (
    <div className="faqs">
      <h1 className="faqs__title">FAQs</h1>
      {/* Accessibility pattern:*/}
      {/* place the role of "group" on the details wrapper*/}
      {/* place the role of "button" on the summary, which lets the user know they can interact with the element*/}

      {faqsData.map((data) => (
        <Question content={data} />
      ))}
    </div>
  );
}
