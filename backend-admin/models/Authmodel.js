import { query } from "../dbconfig/connection.js";
import bcrypt from "bcrypt";

export const registerUser = async (name, email, password) => {
  // const connection = await mysql.createConnection(con);
  // console.log(name, email, password);
  try {
    const rows = await query({
      query: `SELECT * FROM users_tbl WHERE email = '${email}'`,
      values: [],
    });

    if (rows[0].email) {
      console.error("User already registered");
      throw new Error("User already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await query({
      query: "INSERT INTO users_tbl (name, email, password) VALUES (?, ?, ?)",
      values: [name, email, hashedPassword],
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error registering user");
  } finally {
    // await con.end();
  }
};

// import mysql from 'mysql2/promise';
// import bcrypt from 'bcrypt';

export const loginUser = async (email, password) => {
  try {
    const [rows] = await query({
      query: "SELECT * FROM users_tbl WHERE email = ?",
      values: [email],
    });

    if (!rows) {
      throw new Error("User not found");
    }

    // Check password validity
    const isPasswordValid = await bcrypt.compare(password, rows.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    return {
      message: "Login successful",
      user: { id: rows.id, email: rows.email },
    };
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Error logging in");
  } finally {
  }
};

export const getData = async (queries, values) => {
  try {
    const result = await query({
      query: queries,
      values: [],
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error registering user");
  } finally {
    // await con.end();
  }
};
export const getOne = async (queries, values) => {
  try {
    const result = await query({
      query: queries,
      values: values,
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error registering user");
  } finally {
    // await con.end();
  }
};

export const postData = async (queries, values) => {
  try {
    const result = await query({
      query: queries,
      values: values,
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error registering user");
  } finally {
    // await con.end();
  }
};

export const deleteData = async (queries, values) => {
  try {
    const result = await query({
      query: queries,
      values: values,
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error registering user");
  } finally {
    // await con.end();
  }
};


export const updateData = async (queries, values) => {
  try {
    const result = await query({
      query: queries,
      values: values,
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error registering user");
  } finally {
    // await con.end();
  }
};
