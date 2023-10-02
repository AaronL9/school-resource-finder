import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function SideBarLink({ iconClass, label, path }) {
  return (
    <li className="list">
      <NavLink id="nav-link" to={path}>
        <i className={iconClass}></i>
        <span className="link">{label}</span>
      </NavLink>
    </li>
  );
}
