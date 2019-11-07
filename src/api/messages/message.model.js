import mongoose from "mongoose";
import { requiredStringValidator } from "api/validators";

const MessageSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Message cannot be blank"],
      validate: requiredStringValidator
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    },
    replies: {
      type: Array
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model("Message", MessageSchema);
