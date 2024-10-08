import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const [values, setValues] = useState({ name: null, email: null });

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}api/users/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, password: "" }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      console.log("Update successful");
      alert("successfully update");
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div>
      <div className="Form" style={{paddingTop:'2rem'}}>    
        <form onSubmit={handleSubmit} style={{paddingTop:'3rem',border:'1px solid black'}}>
        <h4 style={{textAlign:'center'}}>Edit Profile</h4>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={values.name || ""}
              onChange={handleInput}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={values.email || ""}
              onChange={handleInput}
            />
          </label>
          <div className="btn">
            <button type="submit" className="btn btn-success">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
