import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// assets
import "../assets/css/navbar.css";

// components
import SideBarLink from "./SideBarLink";
import { useAuthContext } from "../hooks/useAuthContext";

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };


  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <nav className={`nav ${isOpen ? "open" : ""}`}>
        <div className="logo">
          <i className="bx bx-menu menu-icon" onClick={toggleNavbar}></i>
          <span className="logo-name">School Resource Finder</span>
        </div>
        <div className="sidebar">
          <div className="logo">
            <i className="bx bx-menu menu-icon" onClick={toggleNavbar}></i>
            <span className="logo-name">MENU</span>
          </div>
          <div className="sidebar-content">
            <ul className="lists">
              <SideBarLink
                iconClass={"bx bx-home-alt icon"}
                label={"Home"}
                path={"home"}
              />
              <SideBarLink
                iconClass={"bx bx-file icon"}
                label={"Submit Reviewer"}
                path={"submit"}
              />
              <SideBarLink
                iconClass={"bx bx-heart icon"}
                label={"Favorites"}
                path={"favorites"}
              />
                <SideBarLink
                iconClass={"bx bx-info-circle icon"}
                label={"FAQs"}
                path={"faqs"}
              />
              <SideBarLink
                iconClass={"bx bx-user-circle icon"}
                label={"Profile"}
                path={"profile"}
              />
            </ul>
            <div className="bottom-content">
              <li className="list">
                <Link to="/student/settings" id="nav-link">
                  <i className="bx bx-cog icon"></i>
                  <span className="link">Setting</span>
                </Link>
              </li>
              <li className="list">
                <Link onClick={handleLogout} id="nav-link">
                  <i className="bx bx-log-out icon"></i>
                  <span className="link">Logout</span>
                </Link>
              </li>
            </div>
          </div>
        </div>
      </nav>
      <section
        className={`overlay ${isOpen ? "open" : ""}`}
        onClick={toggleNavbar}
      ></section>
    </>
  );
}

export default Navbar;
