import mongoose from "mongoose";
import { ReplySchema } from "../replies/reply.model";
import { requiredStringValidator } from "../../models/validators";

export const PostSchema = mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  replies: [ReplySchema],
  body: {
    type: String,
    required: [true, "Post body cannot be blank"],
    validate: requiredStringValidator
  },
  topic: {
    type: mongoose.Types.ObjectId,
    ref: "Topic"
  },
  title: {
    type: String,
    required: [true, "This Post needs a title"],
    validate: requiredStringValidator
  }
});

export default mongoose.model("Post", PostSchema);
