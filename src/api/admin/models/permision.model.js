import mongoose from "mongoose";

export const permissionSchema = mongoose.Schema(
  {
    can: { type: String, required: [true, "capability (can) cannot be blank"] }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model("Permission", permissionSchema);
