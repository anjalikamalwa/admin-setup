import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isToggled, setIstoggled] = useState(false);

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let item = { email, password };
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
      <div className="Form">
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Submit</button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <NavLink onClick={() => setIstoggled(!isToggled)}>
            Forgot Password
          </NavLink>
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
                <NavLink to="/verify" onClick={sendLink}>
                  Submit
                </NavLink>
              </div>
            </form>
          </div>
        )}

        {/* Logout button */}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default Login;
