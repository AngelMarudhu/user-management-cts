import mongoose from "mongoose";

// For a future purpose we can reuse the file schema for other file uploading

const FileSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    filepath: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // User reference
  },
  { timestamps: true }
);

export default mongoose.model("File", FileSchema);
