import {
  deleteData,
  getData,
  getOne,
  postData,
  updateData,
} from "../models/Authmodel.js";

export const getCategory = async (req, res) => {
  try {
    const data = await getData("SELECT `id`,`category_name` FROM category");
    res.json({ message: "product fetch success!", data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOnecategory = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await getOne(
      "SELECT `id` , `category_name` FROM category WHERE id =?",
      [id]
    );
    res.json({ message: "product fetch success", data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const createCategory = async (req, res) => {
  const { category_name } = req.body;
  try {
    const data = await postData(
      "INSERT INTO category (category_name) VALUES (?)",
      [category_name]
    );
    res.json({ message: "category added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body, id);
    const { category_name } = req.body;

    const data = await updateData(
      "UPDATE category SET category_name=? WHERE id = ?",
      [category_name, id]
    );

    res.json({ message: "category update successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const deleteCategory = async (req, res) => {
  try {
    const { ids } = req.params;
    console.log(req.params);
    // const productId = req.params.id;
    if (!ids) {
      return res.status(400).json({ error: "ids required" });
    }
    let idArr = ids.split(",");
    idArr.map(
      async (id) => await deleteData("DELETE  FROM category WHERE id = ?", [id])
    );

    return res.json({ message: "category delete successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updatecStatus = async (req, res) => {
  const { id } = req.body;
  const { status } = req.body;
  console.log(id);

  try {
    await postData("UPDATE category SET status = ? WHERE id = ?", [status, id]);

    res.json({ message: "category status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
