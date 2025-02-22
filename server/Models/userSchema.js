import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    profilePicture: { type: mongoose.Schema.Types.ObjectId, ref: "File" },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
