import mongoose from "mongoose";
import { requiredStringValidator } from "api/validators";

export const ReplySchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "This reply has no author"]
    },
    text: {
      type: String,
      required: [true, "Reply cannot be blank"],
      validate: requiredStringValidator
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Post"
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

export default mongoose.model("Reply", ReplySchema);
