import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div>
        <div className="main-sidebar sidebar-style-2">
          <aside id="sidebar-wrapper">
            <div className="sidebar-brand">
              <a href="index.html">
                {" "}
                <img
                  alt="image"
                  src="images/logo.png"
                  className="header-logo"
                />{" "}
                <span className="logo-name">Otika</span>
              </a>
            </div>
            <ul className="sidebar-menu">
              <li className="menu-header">Pages</li>
              <div className="dropdown show">
                <a
                  className="btn btn-info"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Auth
                </a>

                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <NavLink className="dropdown-item" to="/">
                    Log in
                  </NavLink>
                  <a className="dropdown-item" href="#">
                    Forgot Pasword
                  </a>
                  <NavLink className="dropdown-item" to = "/category">Category</NavLink>
                  <NavLink className="dropdown-item" to = "/graph">Data</NavLink>
                  <NavLink className="dropdown-item" to = "/tablepdf">PdfData</NavLink>
                </div>
              </div>
            </ul>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
