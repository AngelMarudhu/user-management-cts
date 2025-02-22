import userSchema from "../Models/userSchema.js";
import File from "../Models/fileSchema.js";
import path from "path";
import fs from "fs";

export const getUsers = async (req, res) => {
  try {
    const users = await userSchema.find({ role: "user" }).select("-password");

    if (users.length === 0) {
      return res.status(404).json({ message: "no users found" });
    }

    /// we need to fetch the profile picture of the user as well

    const usersWithProfilePictures = await Promise.all(
      users.map(async (user) => {
        const profilePicture = await File.findById(user.profilePicture);
        return {
          ...user._doc,
          profilePicture: `uploads/${profilePicture.filename}`,
        };
      })
    );

    res.status(200).json({
      message: "users fetched successfully",
      success: true,
      users: usersWithProfilePictures,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const { name, email } = req.body;

    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    if (req.file && user.profilePicture) {
      const file = await File.findById(user.profilePicture);
      if (file) {
        const filePath = path.join("uploads", file.filename);
        console.log("File Path:", filePath);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log("Deleted Old File:", filePath);
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
        name: name || user.name,
        email: email || user.email,
        profilePicture: fileData ? fileData._id : user.profilePicture,
      },
      { new: true }
    );

    res.status(200).json({
      message: "user updated successfully",
      success: true,
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userSchema.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    if (user.profilePicture) {
      const file = await File.findById(user.profilePicture);

      if (file) {
        const filePath = path.join("uploads", file.filename);

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      await File.findByIdAndDelete(user.profilePicture);
    }

    await userSchema.findByIdAndDelete(userId);

    res.status(200).json({
      message: "user deleted successfully",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
