import React, { useEffect, useState } from "react";

const Category = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [category_name, setCategory_name] = useState("");
  const [isToggled, setIstoggled] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [redata, setRedata] = useState();
  const [data, setData] = useState();
  const [checkedData, setCheckedData] = useState([]);

  const fetchAllData = async (e) => {
    try {
      const data = await fetch(`${apiUrl}api/category`);
      if (!data.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await data.json();
      setRedata(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleData = async (e) => {
    e.preventDefault();

    try {
      if (!category_name) {
        throw new Error("All fields are required");
      }
      let item = { category_name };
      console.log(item);
      const response = await fetch(`${apiUrl}api/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      console.log(response);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Adding error:", error);
    }
  };

  const updatData = async (e) => {
    try {
      if (!category_name) {
        throw new Error("All fields are required");
      }

      let item = { category_name };
      const response = await fetch(`${apiUrl}api/category/${e}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      console.log(response);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      console.log("update successfully");
    } catch (error) {
      console.error("Adding error:", error);
    }
  };

  const updatefor = (id) => {
    setData(id);
    setToggled(!toggled);
  };

  const deleteProduct = (id) => {
    let ids = "";
    console.log(ids);
    if (id) {
      ids = id;
    } else {
      ids = checkedData?.map((data) => data.id).toString();
    }

    fetch(`${apiUrl}api/category/${ids}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
      });
    });
  };

  const handleStatus = async (id, status) => {
    let data = checkedData.map((d) => d.json());
    console.log(data);
    try {
      const changeStatus = status === 0 ? 1 : 0;
      const statusData = {
        id: id,
        status: changeStatus,
      };

      const response = await fetch(`${apiUrl}api/updatecstatus`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(statusData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      fetchAllData();
      console.log("Status update successful");
    } catch (error) {
      console.log(error);
    }
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

  return (
    <>
      <div className="category-container">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Id:</th>
              <th>Name:</th>
              <th>Edit:</th>
              <th>Status:</th>
              <th>Edit:</th>
            </tr>
          </thead>
          {redata?.map((data, index) => (
            <tbody key={index}>
              <tr>
                <td>
                  <input type="checkbox" onChange={selectItem} />
                </td>
                <td>{data.id}</td>
                <td>{data.category_name}</td>
                <td className="edit" style={{ display: "flex" }}>
                  {" "}
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => updatefor(data.id)}
                  >
                    update category
                  </button>
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

        <button
          className="btn btn-success"
          onClick={() => setIstoggled(!isToggled)}
        >
          Add Category
        </button>

        {isToggled && (
          <div className="Model">
            <form className="form-group" onSubmit={handleData}>
              <input
                type="text"
                placeholder="Please enter Your category name...."
                name="category_name"
                onChange={(e) => setCategory_name(e.target.value)}
              />
              <button className="btn btn-success">submit</button>
            </form>
          </div>
        )}

        {toggled && (
          <div className="Model">
            <h5>update category</h5>
            <input
              type="text"
              placeholder="Please enter new category name...."
              name="category_name"
              onChange={(e) => setCategory_name(e.target.value)}
            />
            <button className="btn btn-success" onClick={() => updatData(data)}>
              submit
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Category;
