import userSchema from "../Models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import File from "../Models/fileSchema.js";
import path from "path";
import fs from "fs";

dotenv.config();

const adminRoles = process.env.ADMIN_EMAILS.split(",");

export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userSchema.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "user already regitered" });
    }

    let fileData = null;

    if (req.file) {
      const newFile = new File({
        filename: req.file.filename,
        filepath: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
      });

      fileData = await newFile.save();
    }

    const role = adminRoles.includes(email) ? "admin" : "user";

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userSchema.create({
      name,
      email,
      role,
      password: hashedPassword,
      profilePicture: fileData ? fileData._id : null,
    });

    res.status(201).json({
      message: "user registered successfully",
      success: true,
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "10d",
      }
    );

    // console.log(user);

    const findProfilePicture = await File.findById(user.profilePicture);

    res.status(200).json({
      message: "user logged in",
      success: true,
      token: token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture
          ? `/uploads/${findProfilePicture.filename}`
          : null,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await userSchema.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    if (req.file && user.profilePicture) {
      const file = await File.findById(user.profilePicture);

      if (file) {
        const filePath = path.join("uploads", file.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        await File.findByIdAndDelete(user.profilePicture);
      }
    }
    let fileData = null;

    if (req.file) {
      const newFile = new File({
        filename: req.file.filename,
        filepath: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
      });

      fileData = await newFile.save();
    }

    const updatedUser = await userSchema.findByIdAndUpdate(
      userId,
      {
        _id: userId,
        name: user.name,
        email: user.email,
        profilePicture: fileData ? fileData._id : user.profilePicture,
      },
      { new: true }
    );

    res.status(201).json({
      message: "user updated successfully",
      success: true,
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        profilePicture: updatedUser.profilePicture
          ? `/uploads/${fileData.filename}`
          : null,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const findProfilePicture = await File.findById(user.profilePicture);

    res.status(200).json({
      message: "user profile fetched successfully",
      success: true,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture
          ? `/uploads/${findProfilePicture.filename}`
          : null,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
