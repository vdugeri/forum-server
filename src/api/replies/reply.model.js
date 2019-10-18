import mongoose from "mongoose";
import { requiredStringValidator } from "../validators";

export const ReplySchema = mongoose.Schema({
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
});

export default mongoose.model("Reply", ReplySchema);
