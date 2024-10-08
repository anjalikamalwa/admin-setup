import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [data, setData] = useState("");
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const getData = () => {
    fetch(`${apiUrl}api/users`)
      .then((result) => result.json())
      .then((resp) => {
        setData(resp.data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {" "}
      <div>
        <nav
          className="navbar navbar-expand-lg main-navbar sticky"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.6) 41px -18px 40px",
            backgroundColor: "white",
          }}
        >
          <div className="form-inline mr-auto">
            <ul className="navbar-nav mr-3">
              <li>
                <a
                  href="#"
                  data-toggle="sidebar"
                  className="nav-link nav-link-lg collapse-btn"
                >
                  {" "}
                  <i data-feather="align-justify"></i>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link nav-link-lg fullscreen-btn">
                  <i data-feather="maximize"></i>
                </a>
              </li>
              <li></li>
            </ul>
          </div>
          <ul className="navbar-nav navbar-right">
            <li className="dropdown">
              <a
                href="#"
                data-toggle="dropdown"
                className="nav-link dropdown-toggle nav-link-lg nav-link-user"
              >
                {" "}
                <img
                  alt="image"
                  src="images/user.png"
                  className="user-img-radious-style"
                />{" "}
                <span className="d-sm-none d-lg-inline-block"></span>
              </a>
              <div className="dropdown-menu dropdown-menu-right pullDown">
                <div className="dropdown-title">Hello Sarah Smith</div>
                {Array.isArray(data) &&
                  data.map((res, i) => (
                    <NavLink
                      key={i}
                      to={`/profile/${res.id}`}
                      className="dropdown-item has-icon"
                    >
                      {" "}
                      <i className="far fa-user"></i> Profile
                    </NavLink>
                  ))}
                <a href="#" className="dropdown-item has-icon">
                  {" "}
                  <i className="fas fa-cog"></i>
                  Settings
                </a>
                <div className="dropdown-divider"></div>
                <NavLink
                  to="/"
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem("token");
                    window.location.reload(false);
                  }}
                  className="dropdown-item has-icon text-danger"
                >
                  {" "}
                  <i className="fas fa-sign-out-alt"></i>
                  Logout
                </NavLink>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
