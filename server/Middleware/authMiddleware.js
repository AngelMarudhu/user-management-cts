import jwt from "jsonwebtoken";
import userSchema from "../Models/userSchema.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "token not valid" });
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    const authorizedUser = await userSchema.findById(decodeToken.userId);

    req.user = authorizedUser;
    next();
  } catch (error) {
    res.status(500).json({ message: "invalid token" });
  }
};

export const roleAuthorization = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "access denied" });
    }
    next();
  };
};
