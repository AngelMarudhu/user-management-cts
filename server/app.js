import express from "express";
import cors from "cors";
import { loginRouter } from "./Routes/loginRouter.js";
import { adminRouter } from "./Routes/adminRouter.js";
import {
  authenticateUser,
  roleAuthorization,
} from "./Middleware/authMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use("/", (req, res) => {
//   res.send("API is running");
// });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", loginRouter);
app.use(
  "/api/admin",
  authenticateUser,
  roleAuthorization("admin"),
  adminRouter
);
