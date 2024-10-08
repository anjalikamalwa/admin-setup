import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const TableToPdf = () => {
  const [response, setResponse] = useState([]);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

//   const doc = new jsPDF();
//   autoTable(doc, { html: "#table_with_data" });
  const downloadTable = () => {
    const doc = new jsPDF();
    autoTable(doc, { html: "#table_with_data" });
    doc.save("table.pdf");
  };

  const fetchProductData = async () => {
    try {
      const data = await fetch(`${apiUrl}api/products`);
      if (!data.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await data.json();
      setResponse(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <div
      className="table-container text-center"
      style={{
        display: "flex",
        alignItems: "center",
        margin: "5rem",
        flexDirection: "column",
      }}
    >
      <button onClick={downloadTable} className="btn my-6">
        Download Table
      </button>
      <table border="3" className="table" id="table_with_data">
        <thead>
          <tr className="text-dark">
            <th>
              Select all <input type="checkbox" name="allselect" />
            </th>
            <th>Id:</th>
            <th>Category_id</th>
            <th>Product_Name:</th>
            <th>Image:</th>
          </tr>
        </thead>
        {Array.isArray(response) &&
          response.map((data, index) => (
            <tbody key={index}>
              <tr>
                <td>
                  <input
                    id={data.id}
                    data-status={data.status}
                    type="checkbox"
                  />
                </td>
                <td>{data.id}</td>
                <td>{data.category_id}</td>
                <td>{data.product_name}</td>
                <td>
                  <img src={`${apiUrl}images/${data.image}`} />
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  );
};

export default TableToPdf;
