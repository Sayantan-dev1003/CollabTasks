import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    default: null,
  },
  role: { type: String, enum: ["Admin", "Manager", "Member"], default: "Member" },
}, { timestamps: true });

export default mongoose.model("User", userSchema);