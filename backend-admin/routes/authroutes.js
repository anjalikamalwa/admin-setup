import { Router } from "express";
// import { register } from "../controllers/authcontroller.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getProductstatus,
  multipleStatus,
  searchData,
  updateProduct,
  updateStatus,
} from "../controllers/productController.js";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import { forgotPassword, login, register, resetPassword, verifyToken } from "../controllers/authcontroller.js";
import { validateToken } from "../middleware/validatetoken.js";
import { createCategory, deleteCategory, getCategory, getOnecategory, updateCategory, updatecStatus } from "../controllers/categorycontroller.js";
import { getUsers, updateUser } from "../controllers/usercontroller.js";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
export const authRouter = Router();
// authRouter.post("/register", register);

authRouter.put("/category/:id",updateCategory);
authRouter.get("/products", getProducts,validateToken);
authRouter.post("/products", upload.array("image"), createProduct);
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.delete("/products/:ids", deleteProduct);
authRouter.post("/updatestatus", updateStatus);
authRouter.post("/multiplestatus",multipleStatus);
authRouter.put("/product/:id", upload.single("image"), updateProduct);
authRouter.get("/products/:id",getProduct);
authRouter.get("/category",getCategory);
authRouter.post("/category",createCategory);
authRouter.get("/category/:id",getOnecategory);
authRouter.delete("/category/:ids",deleteCategory);
authRouter.post("/newproducts",searchData);
authRouter.get("/users",getUsers);
authRouter.put("/users/:id",updateUser);
authRouter.post("/updatecstatus",updatecStatus);
authRouter.get("/getstatus/:id",getProductstatus);

authRouter.post("/forgot-password", forgotPassword);
authRouter
  .get("/reset-password/:id/:token", verifyToken)
  .post("/reset-password/:id/:token", resetPassword);
