import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const AuthLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isToggled, setIstoggled] = useState(false);
  const [logindata, setLogindata] = useState();
  const [id , setId] = useState("")

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let item = {id, email, password };
      const response = await fetch(`${apiUrl}api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const responseData = await response.json();
      if (responseData.token) {
        localStorage.setItem("token", JSON.stringify(responseData.token));
        navigate("/");
        window.location.reload(false);
      }
      localStorage.setItem("item",item);
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
    }
  };

  const sendLink = async (event) => {
    event.preventDefault();
    try {
      if (!email) {
        throw new Error("Email is required");
      }

      const link = { email: email };

      const fetchd = await fetch(`${apiUrl}api/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(link),
      });

      if (!fetchd.ok) {
        throw new Error("Error sending link");
      }

      console.log("Link sent to your email");
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="LoginForm">
        <form onSubmit={handleSubmit}>
          <h2>Log in</h2>

          <label htmlFor="">Id:</label>
          <input type="number" name="id" onChange={(e) => setId(e.target.value)} />
          <label>Email:</label>   
          <input
            type="email"
            name="email"
            placeholder="Please enter Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Please enter Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="btn">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="link">
            <NavLink onClick={() => setIstoggled(!isToggled)}>
              Forgot Password
            </NavLink>
          </div>
        </form>
        {isToggled && (
          <div className="Model">
            <form>
              <input
                type="text"
                placeholder="Please enter Your email...."
                name="email"
                onChange={(event) => setEmail(event.target.value)}
              />
              <div className="btn">
                <NavLink
                  to="/verify"
                  className="btn btn-success"
                  onClick={sendLink}
                >
                  Submit
                </NavLink>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default AuthLogin;
