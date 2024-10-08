import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  // const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState("");
  const [response, setResponse] = useState([]);
  const [checkedData, setCheckedData] = useState([]);

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

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

  const deleteProduct = (id) => {
    let ids = "";
    console.log(ids);
    if (id) {
      ids = id;
    } else {
      ids = checkedData?.map((data) => data.id).toString();
    }

    fetch(`${apiUrl}api/products/${ids}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        fetchProductData();
      });
    });
  };

  const selectItem = (e) => {
    const status = e.target.dataset.status;
    const { id, checked } = e.target;
    let updatedData = [...checkedData];

    const index = updatedData.findIndex((data) => data.id === id);
    if (checked) {
      if (index === -1) {
        updatedData = [...updatedData, { id, checked, status: status }];
      }
    } else {
      updatedData = updatedData.filter((data) => data.id !== id);
    }
    setCheckedData(updatedData);
  };

  const handleStatus = async (_id, status) => {
    var statusData = {
      status: "",
    };
    const changeStatus = status === 1 ? 0 : 1;

    if (_id) {
      statusData = {
        id: _id,
        status: changeStatus,
      };

      const res = await fetch(`${apiUrl}api/updatestatus`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(statusData),
      });
    } else {
      const id = checkedData.map((data) => data.id).toString();

      statusData = {
        ids: id,
        status: changeStatus,
      };

      const res = await fetch(`${apiUrl}api/multiplestatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(statusData),
      });
    }

    window.location.reload(false);
  };

  const updateStatus = async () => {
    const ids = checkedData.map((data) => data.id).toString();
    console.log(checkedData);
    const allStatus = checkedData
      .map((data) => (data.status === 1 ? 0 : 1))
      .toString();
    console.log(allStatus);
    const StatusData = {
      ids: ids,
      status: allStatus,
    };

    console.log(StatusData);
    // console.log(StatusData);
    const res = await fetch(`${apiUrl}api/multiplestatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(StatusData),
    });
  };

  const deleteallProduct = () => {
    const ids = checkedData.map((data) => data.id).toString();
    if (!ids) {
      console.log("ids is required");
    }
    fetch(`${apiUrl}api/products/${ids}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        fetchProductData();
      });
    });
  };
  const records = response.slice(firstIndex, lastIndex);
  const npage = Math.ceil(response.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changeCPage = (id) => {
    setCurrentPage(id);
  };

  return (
    <>
      <div
        className="table-container text-center"
        style={{
          display: "flex",
          alignItems: "center",
          margin: "5rem",
          flexDirection: "column",
        }}
      >
        <form className="Search-bar">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            placeholder="search your date...."
          />
          <div className="btn">
            <button
              className=""
              style={{
                backgroundColor: "#22b9fb",
                border: "none",
                color: "white",
              }}
            >
              Search
            </button>
          </div>
        </form>
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
              <th>Edit:</th>
              <th>Status:</th>
            </tr>
          </thead>
          {Array.isArray(records) &&
            records
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.product_name.toLowerCase().includes(search);
              })
              .slice(-5)
              .map((data, index) => (
                <tbody key={index}>
                  <tr>
                    <td>
                      <input
                        id={data.id}
                        data-status={data.status}
                        type="checkbox"
                        onChange={selectItem}
                      />
                    </td>
                    <td>{data.id}</td>
                    <td>{data.category_id}</td>
                    <td>{data.product_name}</td>
                    <td>
                      <img src={`${apiUrl}images/${data.image}`} />
                    </td>
                    <td className="first">
                      <NavLink
                        className=" btn btn-info text-white"
                        to={`/update/${data.id}`}
                      >
                        Update
                      </NavLink>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteProduct(data.id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td className="status">
                      <button
                        className="btn btn warning text-white"
                        style={{ backgroundColor: "rgb(223 ,155, 48)" }}
                        onClick={() => handleStatus(data.id, data.status)}
                      >
                        {data.status ? "Active" : "Inactive"}
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
        </table>
        <ul className="pagination">
          <li className="page-item">
            <a href="#" className="page-link" onClick={prePage}>
              Prev
            </a>
          </li>
          {numbers.map((n, i) => (
            <li
              className={`page-item ${currentPage === n ? "active" : ""}`}
              key={i}
            >
              <a href="#" className="page-link" onClick={() => changeCPage(n)}>
                {n}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a href="#" className="page-link" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
        <button className="btn btn-danger" onClick={deleteallProduct}>
          Delete Selected
        </button>
        <button className="btn btn-warning" onClick={updateStatus}>
          Update Selected status
        </button>

        <div className="btn">
          <NavLink className="btn btn-success" to="/add-product">
            Add New Product
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Home;
