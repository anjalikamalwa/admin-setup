import { getData, updateData } from "../models/Authmodel.js";

export const getUsers = async(req,res) => {

    try {
        const data = await getData("SELECT * FROM users_tbl");
        res.json({ message: "product fetch success!", data: data });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }

}

export const updateUser = async (req,res) => {
  const userId = req.params.id;
  const {name,email} = req.body; 
  try {
    const data = await updateData(
      "UPDATE users_tbl SET name = ?, email=? WHERE id = ?",
      [name,email, userId]
    );
    res.json({ message: "update  user data successfully!", data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }

}