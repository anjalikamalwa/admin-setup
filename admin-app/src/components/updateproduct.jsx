import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductUpdate = () => {
  const { id } = useParams();
  const [values, setValues] = useState({
    product_name: null,
    image: null,
  });

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const getData = () => {
    fetch(`${apiUrl}api/products/${id}`)
      .then((result) => result.json())
      .then((resp) => {
        if (resp && typeof resp === "object" && Object.keys(resp).length > 0) {
          const updatedValues = {
            product_name:
              resp.data[0].product_name !== undefined
                ? resp.data[0].product_name
                : null,
            image: resp.data[0].image || null,
          };

          setValues(updatedValues);
          console.log(values);
        } else {
          console.error("Product data not found or in unexpected format");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    getData();
  }, [id]);

  const handleInput = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { product_name, image } = values;

    try {
      if (!product_name || !image) {
        throw new Error("All fields are required");
      }

      const formData = new FormData();
      formData.append("product_name", product_name);
      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(`${apiUrl}api/product/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Adding error:", error);
    }
  };

  return (
    <div>
      <div>
        <div className="Form">
          <h3>Update Product details</h3>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="loginform"
          >
            <label>
              Product Name:
              <input
                type="text"
                name="product_name"
                value={values.product_name || ""}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
              />
            </label>
            <label>
              Product Title:
              <input
                type="file"
                name="image"
                onChange={(e) => handleInput(e.target.name, e.target.files[0])}
              />
            </label>
            <div className="btn">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
