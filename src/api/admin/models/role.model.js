import mongoose from "mongoose";

import { permisionSchema } from "./permissions.model";

const roleSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "role name must not be blank"] },
    permissions: { type: [permisionSchema] }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model("Role", roleSchema);
