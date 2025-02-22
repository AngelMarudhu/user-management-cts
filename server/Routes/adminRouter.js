import express from "express";
import {
  deleteUser,
  getUsers,
  updateUser,
} from "../Controllers/adminController.js";
import upload from "../Middleware/multer.js";

export const adminRouter = express.Router();

adminRouter.get("/get-users", getUsers);

adminRouter.put(
  "/update-user/:userId",
  upload.single("profilePicture"),
  updateUser
);

adminRouter.delete("/delete-user/:userId", deleteUser);
