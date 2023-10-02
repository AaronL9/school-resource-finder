import React from "react";
import { NavLink } from "react-router-dom";

export default function ReviewersItem({ path, label }) {
  return (
    <li className="reviewers__item">
      <NavLink className="reviewers__link" to={path}>
        {label}
      </NavLink>
    </li>
  );
}
