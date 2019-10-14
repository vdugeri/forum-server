import mongoose from "mongoose";
import { ReplySchema } from "./reply.model";
import { requiredStringValidator } from "./validators";

const PostSchema = mongoose.Schema({
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
  title: {
    type: String,
    required: [true, "This Post needs a title"],
    validate: requiredStringValidator
  }
});

export default mongoose.model("Post", PostSchema);
