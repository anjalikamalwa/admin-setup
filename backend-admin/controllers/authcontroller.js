import { getData, loginUser, registerUser, updateData } from "../models/Authmodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  try {
    await registerUser(name, email, password);

    res.json({ message: "Registration successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await loginUser(email, password);

    const token = jwt.sign(
      { userId: result.user.id, email: result.user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: result.message, token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid credentials" });
  }
};


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400);
      throw new Error("All fields are required!");
    }
    const sql = `SELECT * FROM users_tbl WHERE email = '${email}'`;
    console.log(sql);
    const data = await getData(sql);
    console.log(data);
    const user = data[0];

    if (!user) {
      res.status(404);
      throw new Error("User not found!");
    }

    const secret = process.env.ACCESS_TOKEN_SECRET + user.password;
    const token = jwt.sign(
      {
        user: {
          username: user.name,
          email: user.email,
          id: user.id,
        },
      },
      secret,
      { expiresIn: "1h" }
    );

    const link = `http://localhost:${
      process.env.PORT || 6057
    }/api/reset-password/${user.id}/${token}`;
    console.log(link);
    res.json({
      message:
        "Reset password link sent to your email. Please check and verify!",
    });
    // res.render('reset-password',{email:user.email})
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


export const verifyToken = async (req, res) => {
  try {
    const { id, token } = req.params;
    console.log(id,token);
    const data = await getData(`SELECT * FROM users_tbl WHERE id = '${id}'`);
    const user = data[0];

    if (!user) {
      res.status(404);
      throw new Error("User not found!");
    }

    const secret = process.env.ACCESS_TOKEN_SECRET + user.password;

    const verify = jwt.verify(token, secret);

    res.render("index", { email: verify.user.email, user, token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "User not verified!" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;

    const userData = await getData(
      `SELECT * FROM users_tbl WHERE id = '${id}'`
    );
    const user = userData[0];

    if (!user) {
      res.status(404);
      throw new Error("User not found!");
    }

    const secret = process.env.ACCESS_TOKEN_SECRET + user.password;
    const verify = jwt.verify(token, secret);

    const hashedPassword = await bcrypt.hash(password, 10);

    await updateData(`UPDATE users_tbl SET password=? WHERE id = '${id}'`, [
      hashedPassword,
    ]);
    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};


