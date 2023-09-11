import React from "react";
import '../assets/css/menu.css'

export default function Menu({isOpen, setIsOpen}) {
  const handleClick = () => {
    setIsOpen('')
  }
  return (
    <div className={`sidenav ${isOpen}`}>
      <button className="closebtn" onClick={handleClick}>×</button>
      <h3>School Resource Finder</h3>
      <a href="#" className="notes_reviewers">Notes & Reviewer</a>
      <a href="#" className="my_reviewer">My Reviewer</a>
      <a href="#" className="my_request">Request</a>
      <a href="#">Contact</a>
    </div>
  );
}
