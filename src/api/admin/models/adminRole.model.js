import mongoose from "mongoose";

const adminRoleSchema = mongoose.Schema(
  {
    admin: { type: mongoose.Types.ObjectId, ref: "Admin" },
    role: { type: mongoose.Types.ObjectId, ref: "Role" }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model("AdminRole", adminRoleSchema);
