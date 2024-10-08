import {
  getData,
  postData,
  deleteData,
  updateData,
  getOne,
} from "../models/Authmodel.js";

export const getProducts = async (req, res) => {
  try {
    const data = await getData("SELECT * FROM product_table");
    res.json({ message: "product fetch success!", data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = await getOne(
      "SELECT `id`, `product_name`, `image` FROM `product_table` WHERE id = ?",
      [productId]
    );
    res.json({ message: "product get successfully!", data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { product_name, category_id } = req.body;

    if (!req.files) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const fileNames = req.files.map((filename) => filename.filename).toString();

    const data = await postData(
      "INSERT INTO product_table (product_name ,image,category_id) VALUES (?, ?,?)",
      [product_name, fileNames, category_id]
    );

    res.json({ message: "Product created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { ids } = req.params;
    console.log(req.params);
    // const productId = req.params.id;
    if (!ids) {
      return res.status(400).json({ error: "ids required" });
    }
    let idArr = ids.split(",");
    idArr.map(
      async (id) =>
        await deleteData("DELETE  FROM product_table WHERE id = ?", [id])
    );

    return res.json({ message: "product delete successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateStatus = async (req, res) => {
  const { id } = req.body;
  const { status } = req.body;
  console.log(id);

  try {
    await postData("UPDATE product_table SET status = ? WHERE id = ?", [
      status,
      id,
    ]);

    res.json({ message: "Product status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(req.body, req.file);
    const { product_name } = req.body;
    console.log(req.file);

    const image = req.file ? req.file.filename : "";
    console.log(image);

    if (image && image !== "") {
      const data = await updateData(
        "UPDATE product_table SET product_name=?, image=? WHERE id = ?",
        [product_name, image, productId]
      );
    }

    const data = await updateData(
      "UPDATE product_table SET product_name=? WHERE id = ?",
      [product_name, productId]
    );

    res.json({ message: "Product update successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const multipleStatus = async (req, res) => {
  try {
    const { ids, status } = req.body;
    console.log(req.body);

    if (!ids) {
      return res.status(400).json({ error: "ids required" });
    }

    let idArr = ids.split(",");
    // Use Promise.all to wait for all async operations to complete
    await Promise.all(
      idArr.map((id) =>
        updateData("UPDATE product_table SET status = ? WHERE id = ?", [
          status,
          id,
        ])
      )
    );

    return res.json({ message: "Product status updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchData = async (req, res) => {
  const { product_name } = req.query;
  if (!product_name) {
    res.status(400);
    throw new Error("Product name is  required!");
  }
  const sql = `SELECT * FROM product_table WHERE product_name = '${product_name}'`;
  try {
    const data = await postData(sql, [product_name]);
    res.json({ message: "Data get successfully", data: data });
    console.log(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProductstatus = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const data = await getOne(
      "SELECT `status` FROM `category` WHERE id = ?",
      [categoryId]
    );
    const status = data.length > 0 ? data[0].status : null;

    if (status) {
      const productCategoryIdToUpdate = categoryId;
      const newdata = await updateData(
        "UPDATE product_table SET status = ? WHERE category_id = ?",
        [status, productCategoryIdToUpdate]
      );
    } 

    res.json({ message: "Data retrieved successfully", status: status });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

