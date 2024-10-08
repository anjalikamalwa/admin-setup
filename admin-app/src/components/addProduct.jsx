import React, { useEffect, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";

const AddProduct = () => {
  const [product_name, setProduct_name] = useState("");
  const [catid, setCatid] = useState("");
  const [category, setCategory] = useState([]);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imagesArray = [];

    for (let index = 0; index < files.length; index++) {
      const imageFile = files[index];
      imagesArray.push(imageFile);
    }

    // // Set the "image" field in the formData state to the array of images
    // setFormData({ ...formData, image: imagesArray });
    setImage(imagesArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!product_name || !image || !catid) {
        throw new Error("All fields are required");
      }

      const formData = new FormData();
      formData.append("product_name", product_name);
      formData.append("category_id", catid);
      const imagesToUpload = image;

      for (let index = 0; index < imagesToUpload.length; index++) {
        formData.append("image", imagesToUpload[index]);
      }

      const response = await fetch(`${apiUrl}api/products`, {
        method: "POST",
        body: formData,
      });

      console.log(response);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      console.log("added successfully");
      window.location.reload(false);
      Navigate("/");
    } catch (error) {
      console.error("Adding error:", error);
      setError(error.message);
    }
  };
  const fetchCategory = async () => {
    try {
      const data = await fetch(`${apiUrl}api/category`);
      if (!data.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await data.json();
      setCategory(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <>
      <div className="Form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Category</label>
          <select
            name="category"
            id=""
            value={catid}
            onChange={(e) => setCatid(e.target.value)}
          >
            <option value="" selected disabled>
              Select category
            </option>
            {category?.map((cat, index) => {
              return (
                <option key={index} value={cat.id}>
                  {cat.category_name}
                </option>
              );
            })}
          </select>
          <label>Product_name:</label>
          <input
            type="text"
            name="product_name"
            placeholder="Please enter product name..."
            onChange={(e) => setProduct_name(e.target.value)}
          />
          <label>Image:</label>
          <input
            type="file"
            name="image"
            multiple
            onChange={(e) => handleImageChange(e)}
          />
          <div className="btn">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </>
  );
};

export default AddProduct;
