import express from "express";
import {
  userRegister,
  userLogin,
  updateUserProfile,
  getUserProfile,
} from "../Controllers/authController.js";
import upload from "../Middleware/multer.js";
import {
  authenticateUser,
  roleAuthorization,
} from "../Middleware/authMiddleware.js";

export const loginRouter = express.Router();

loginRouter.post("/register", upload.single("profilePicture"), userRegister);

loginRouter.post("/login", userLogin);

loginRouter.put(
  "/updateProfilePicture",
  authenticateUser,
  roleAuthorization("user"),
  upload.single("profilePicture"),
  updateUserProfile
);

loginRouter.get(
  "/get-profile",
  authenticateUser,
  roleAuthorization("user"),
  getUserProfile
);
